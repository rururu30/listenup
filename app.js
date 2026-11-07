/*
 * ListenUp — 画面と操作
 *
 * 問題データは data/questions.js（window.LISTENING_DATA）から読み込む。
 * 音声は js/speech.js（window.Speech）が担当する。
 * この段階（S1）では、回答の記録は画面を開いている間だけ保持し、保存はしない。
 */
(function () {
  "use strict";

  var DAYS = [
    { key: "mon", ja: "月曜日", en: "MON", dow: 1 },
    { key: "tue", ja: "火曜日", en: "TUE", dow: 2 },
    { key: "wed", ja: "水曜日", en: "WED", dow: 3 },
    { key: "thu", ja: "木曜日", en: "THU", dow: 4 },
    { key: "fri", ja: "金曜日", en: "FRI", dow: 5 }
  ];
  var SECTION_COUNTS = [3, 2, 2];
  var SECTION_DEFAULTS = {
    1: { title: "単語を選ぶ", instruction: "短い英文を聞いて、内容に合う英単語を選びましょう。" },
    2: { title: "会話を聞く", instruction: "会話と質問を聞いて、最も適切な英文を選びましょう。" },
    3: { title: "長めの英文を聞く", instruction: "英文と質問を聞いて、最も適切な英文を選びましょう。" }
  };
  var LETTERS = ["A", "B", "C", "D"];
  var SETTINGS_KEY = "listenup:settings:v1";

  var Speech = window.Speech;
  var root = document.getElementById("app");
  var answers = {};
  var settings = loadSettings();
  var dataInfo = { errors: [], days: {}, weekLabel: "" };
  var liveRegion = null;
  var dialog = null;
  var session = null;          // ログイン中の情報 { email, onLogout }
  var active = false;          // ログイン後に start() されたときだけ true
  var listenersReady = false;

  /* ================= 小さな道具 ================= */

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") el.className = v;
        else if (k === "text") el.textContent = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
        else if (v === true) el.setAttribute(k, "");
        else el.setAttribute(k, v);
      });
    }
    if (children !== undefined && children !== null) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return el;
  }

  function loadSettings() {
    var d = { rate: 1, femaleVoice: "auto", maleVoice: "auto" };
    try {
      var s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
      if (s && typeof s === "object") {
        if (typeof s.rate === "number" && s.rate >= 0.5 && s.rate <= 1.5) d.rate = s.rate;
        if (typeof s.femaleVoice === "string") d.femaleVoice = s.femaleVoice;
        if (typeof s.maleVoice === "string") d.maleVoice = s.maleVoice;
      }
    } catch (e) { /* 保存できない環境では既定値で動く */ }
    return d;
  }

  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { /* 無視 */ }
  }

  function announce(msg) {
    if (!liveRegion) return;
    liveRegion.textContent = "";
    setTimeout(function () { liveRegion.textContent = msg; }, 30);
  }

  function reducedMotion() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  /* ================= データ検証 ================= */

  function isStr(v) { return typeof v === "string" && v.trim() !== ""; }

  function validateQuestion(q, secNumber, label, errors) {
    if (!q || typeof q !== "object") { errors.push(label + "：問題が正しい形式ではありません。"); return; }
    if (!isStr(q.id)) errors.push(label + "：id がありません。");
    if (!Array.isArray(q.lines) || q.lines.length === 0) {
      errors.push(label + "：lines（読み上げる英文）がありません。");
    } else {
      q.lines.forEach(function (ln, i) {
        if (!ln || !isStr(ln.speaker) || !isStr(ln.text) || !isStr(ln.ja) ||
            (ln.gender !== "female" && ln.gender !== "male")) {
          errors.push(label + "：lines[" + i + "] は speaker・gender（female か male）・text・ja がすべて必要です。");
        }
      });
    }
    if (secNumber === 1) {
      if (q.question && (!isStr(q.question.text) || !isStr(q.question.ja))) {
        errors.push(label + "：question は text と ja が必要です。");
      }
    } else if (!q.question || !isStr(q.question.text) || !isStr(q.question.ja)) {
      errors.push(label + "：question（質問の英文と日本語訳）が必要です。");
    }
    if (!Array.isArray(q.choices) || q.choices.length !== 4) {
      errors.push(label + "：choices は4つ必要です。");
    } else {
      q.choices.forEach(function (c, i) {
        if (!c || !isStr(c.text) || !isStr(c.ja)) {
          errors.push(label + "：choices[" + i + "] は text と ja が必要です。");
        }
      });
    }
    if (typeof q.answer !== "number" || q.answer % 1 !== 0 || q.answer < 0 || q.answer > 3) {
      errors.push(label + "：answer は 0〜3 の整数にしてください。");
    }
    if (!isStr(q.explanation)) errors.push(label + "：explanation（解説）がありません。");
  }

  function validateData(data) {
    var errors = [];
    var days = {};
    var weekLabel = "";
    if (!data || typeof data !== "object" || !Array.isArray(data.days)) {
      errors.push("問題データを読み込めませんでした。data/questions.js の中身と形式を確認してください。");
      return { errors: errors, days: days, weekLabel: weekLabel };
    }
    weekLabel = isStr(data.weekLabel) ? data.weekLabel : "";
    var usedIds = {};

    data.days.forEach(function (d, di) {
      var def = null;
      DAYS.forEach(function (x) { if (d && x.key === d.day) def = x; });
      if (!def) {
        errors.push("days[" + di + "]：day は mon・tue・wed・thu・fri のいずれかにしてください。");
        return;
      }
      if (days[def.key]) {
        errors.push(def.ja + "：同じ曜日のデータが複数あります。");
        return;
      }
      var before = errors.length;
      var flat = [];
      if (!Array.isArray(d.sections) || d.sections.length !== 3) {
        errors.push(def.ja + "：大問は3つ必要です。");
      } else {
        d.sections.forEach(function (sec, si) {
          var secLabel = def.ja + " 大問" + (si + 1);
          if (!sec || !Array.isArray(sec.questions) || sec.questions.length !== SECTION_COUNTS[si]) {
            errors.push(secLabel + "：問題数は " + SECTION_COUNTS[si] + " 問にしてください。");
            return;
          }
          sec.questions.forEach(function (q, qi) {
            var label = secLabel + " 問" + (qi + 1);
            validateQuestion(q, si + 1, label, errors);
            if (q && isStr(q.id)) {
              if (usedIds[q.id]) errors.push(label + "：id「" + q.id + "」が他の問題と重複しています。");
              usedIds[q.id] = true;
            }
            flat.push({ section: sec, secIndex: si, secNumber: si + 1, qIndex: qi, q: q, no: flat.length + 1 });
          });
        });
      }
      if (errors.length === before) {
        days[def.key] = { def: def, raw: d, flat: flat, isDummy: d.isDummy === true };
      }
    });
    return { errors: errors, days: days, weekLabel: weekLabel };
  }

  /* ================= 回答の状態 ================= */

  function getRec(dayKey, qid) {
    if (!answers[dayKey]) answers[dayKey] = {};
    if (!answers[dayKey][qid]) answers[dayKey][qid] = { choice: null, revealed: false };
    return answers[dayKey][qid];
  }

  function peekRec(dayKey, qid) {
    return (answers[dayKey] && answers[dayKey][qid]) || null;
  }

  function dayStats(dayKey, day) {
    var s = { total: day.flat.length, answered: 0, correct: 0, viewed: 0, done: 0 };
    day.flat.forEach(function (it) {
      var r = peekRec(dayKey, it.q.id);
      if (!r) return;
      if (r.choice !== null) {
        s.answered += 1;
        if (r.choice === it.q.answer) s.correct += 1;
      } else if (r.revealed) {
        s.viewed += 1;
      }
    });
    s.done = s.answered + s.viewed;
    return s;
  }

  function firstUndone(dayKey, day) {
    for (var i = 0; i < day.flat.length; i++) {
      var r = peekRec(dayKey, day.flat[i].q.id);
      if (!r || (r.choice === null && !r.revealed)) return i + 1;
    }
    return 0;
  }

  /* ================= ルーティング ================= */

  function parseRoute() {
    var parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "day" && parts[1]) {
      if (parts[2] === "result") return { name: "result", day: parts[1] };
      var n = parseInt(parts[2], 10);
      return { name: "question", day: parts[1], n: isNaN(n) ? 1 : n };
    }
    return { name: "home" };
  }

  function render(opts) {
    if (!active) return;
    var keep = !!(opts && opts.keepScroll);
    var y = window.scrollY || 0;
    var r = parseRoute();
    var node = null;

    if (dataInfo.errors.length) {
      node = renderDataError();
    } else if (r.name === "question") {
      node = renderQuestion(r.day, r.n);
    } else if (r.name === "result") {
      node = renderResult(r.day);
    }
    if (!node) node = renderHome();

    root.replaceChildren(node);
    updatePlayUI();

    if (keep) {
      window.scrollTo(0, y);
    } else {
      window.scrollTo(0, 0);
      var f = document.querySelector("[data-focus]");
      if (f && typeof f.focus === "function") f.focus({ preventScroll: true });
    }
  }

  /* ================= ホーム ================= */

  function renderDataError() {
    document.title = "データエラー｜ListenUp";
    var items = dataInfo.errors.slice(0, 12).map(function (m) { return h("li", { text: m }); });
    if (dataInfo.errors.length > 12) {
      items.push(h("li", { text: "ほか " + (dataInfo.errors.length - 12) + " 件" }));
    }
    return h("div", { class: "page" }, [
      h("h1", { class: "hero-title", tabindex: "-1", "data-focus": "", text: "問題データに問題があります" }),
      h("div", { class: "notice is-error", role: "alert" }, [
        h("p", { text: "data/questions.js の形式を確認してください。内容は書き換えていません。" }),
        h("ul", null, items)
      ]),
      h("p", { class: "home-note", text: "形式の説明は data/DATA_FORMAT.md にあります。" })
    ]);
  }

  function renderHome() {
    document.title = "ListenUp｜英語リスニング練習";
    var today = new Date().getDay();
    var anyDummy = false;

    var list = h("ul", { class: "day-list" });
    DAYS.forEach(function (def) {
      var day = dataInfo.days[def.key];
      var li = h("li");
      if (!day) {
        li.appendChild(h("div", { class: "day-card is-disabled day-" + def.key }, [
          h("div", { class: "day-head" }, [
            h("span", { class: "day-name", text: def.ja }),
            h("span", { class: "day-en", text: def.en })
          ]),
          h("p", { class: "day-meta", text: "この曜日の問題データはまだありません。" })
        ]));
        list.appendChild(li);
        return;
      }
      if (day.isDummy) anyDummy = true;
      var st = dayStats(def.key, day);
      var resume = firstUndone(def.key, day);
      var href = "#/day/" + def.key + "/" + (resume || 1);
      var status;
      if (st.done === 0) status = "まだ始めていません";
      else if (st.done >= st.total) status = "完了　正解 " + st.correct + " / " + st.total;
      else status = "回答 " + st.done + " / " + st.total + "　続きから始められます";

      li.appendChild(h("a", { class: "day-card day-" + def.key, href: href }, [
        h("div", { class: "day-head" }, [
          h("span", { class: "day-name", text: def.ja }),
          h("span", { class: "day-en", text: def.en }),
          def.dow === today ? h("span", { class: "badge badge-today", text: "今日" }) : null,
          day.isDummy ? h("span", { class: "badge badge-dummy", text: "仮データ" }) : null
        ]),
        h("p", { class: "day-meta", text: "大問3つ・全" + st.total + "問（約30分）" }),
        h("div", { class: "bar", "aria-hidden": "true", style: "--p:" + Math.round(st.done / st.total * 100) + "%" }, h("span")),
        h("p", { class: "day-status", text: status }),
        h("span", { class: "day-chev", "aria-hidden": "true", text: "›" })
      ]));
      list.appendChild(li);
    });

    var page = h("div", { class: "page" });
    page.appendChild(h("div", { class: "home-top" }, [
      session && session.email
        ? h("span", { class: "user-chip", title: session.email, text: session.email })
        : h("span"),
      h("div", { class: "home-actions" }, [
        h("button", { class: "btn-ghost", type: "button", onclick: openSettings }, "⚙ 音声の設定"),
        session && typeof session.onLogout === "function"
          ? h("button", { class: "btn-ghost", type: "button", onclick: function () { session.onLogout(); } }, "ログアウト")
          : null
      ])
    ]));
    page.appendChild(h("header", { class: "hero" }, [
      h("p", { class: "eyebrow", text: "ENGLISH LISTENING" }),
      h("h1", { class: "hero-title", tabindex: "-1", "data-focus": "", text: "ListenUp" }),
      h("p", { class: "hero-sub", text: "英語リスニング練習。英検2級・共通テストをめやすにした、1日約30分のリスニングです。曜日を選んで始めましょう。" })
    ]));

    if (!Speech || !Speech.supported) {
      page.appendChild(h("div", { class: "notice is-error", role: "alert", text:
        "このブラウザは音声の読み上げに対応していません。Chrome や Safari の最新版でお試しください。" }));
    }
    if (anyDummy) {
      page.appendChild(h("div", { class: "notice", text:
        "いまは動作確認用の仮データです。本番の問題データに差し替えると、この表示は消えます。" }));
    }
    var label = dataInfo.weekLabel;
    if (label) page.appendChild(h("p", { class: "week-label", text: label }));
    page.appendChild(list);
    page.appendChild(h("p", { class: "home-note", text:
      "音声は、お使いの端末の読み上げ機能で再生します。「再生」ボタンを押したときだけ流れ、何度でも聞き直せます。" }));
    return page;
  }

  /* ================= 問題画面 ================= */

  function buildProgress(dayKey, day, current) {
    var nav = h("nav", { class: "progress", "aria-label": "問題の進み具合" });
    [0, 1, 2].forEach(function (si) {
      var items = day.flat.filter(function (it) { return it.secIndex === si; });
      var dots = h("div", { class: "pdots" });
      items.forEach(function (it) {
        var r = peekRec(dayKey, it.q.id);
        var cls = "dot";
        var mark = "";
        var stateText = "未回答";
        if (r && r.choice !== null) {
          if (r.choice === it.q.answer) { cls += " is-correct"; mark = "✓"; stateText = "正解"; }
          else { cls += " is-wrong"; mark = "✕"; stateText = "不正解"; }
        } else if (r && r.revealed) {
          cls += " is-viewed"; mark = "–"; stateText = "答えを確認";
        }
        if (it.no === current) cls += " is-current";
        dots.appendChild(h("a", {
          class: cls,
          href: "#/day/" + dayKey + "/" + it.no,
          "aria-label": "問題" + it.no + "（大問" + it.secNumber + "）：" + stateText,
          "aria-current": it.no === current ? "step" : null,
          text: String(it.no) + mark
        }));
      });
      nav.appendChild(h("div", { class: "pgroup", style: "flex:" + items.length + " 1 0" }, [
        h("span", { class: "plabel", text: "大問" + (si + 1) }),
        dots
      ]));
    });
    return nav;
  }

  function buildTranscript(q) {
    var speakers = {};
    q.lines.forEach(function (ln) { speakers[ln.speaker] = true; });
    var multi = Object.keys(speakers).length > 1;

    var box = h("section", { class: "transcript", "aria-label": "英文と日本語訳" }, [
      h("h3", { text: "英文と日本語訳" })
    ]);
    q.lines.forEach(function (ln) {
      box.appendChild(h("div", { class: "tline" }, [
        multi ? h("span", { class: "speaker", text: ln.speaker }) : null,
        h("p", { class: "t-en", lang: "en", text: ln.text }),
        h("p", { class: "t-ja", text: ln.ja })
      ]));
    });
    if (q.question) {
      box.appendChild(h("div", { class: "tline" }, [
        h("span", { class: "speaker", text: "Question" }),
        h("p", { class: "t-en", lang: "en", text: q.question.text }),
        h("p", { class: "t-ja", text: q.question.ja })
      ]));
    }
    return box;
  }

  function renderQuestion(dayKey, n) {
    var day = dataInfo.days[dayKey];
    if (!day) return null;
    var total = day.flat.length;
    n = Math.min(Math.max(n, 1), total);
    var it = day.flat[n - 1];
    var q = it.q;
    var sec = it.section;
    var rec = getRec(dayKey, q.id);
    var answered = rec.choice !== null;
    var locked = answered || rec.revealed;
    var defaults = SECTION_DEFAULTS[it.secNumber];
    var inSection = day.flat.filter(function (x) { return x.secIndex === it.secIndex; }).length;

    document.title = day.def.ja + " 問" + n + "｜ListenUp";

    /* 選択肢 */
    var list = h("ul", { class: "choices" });
    q.choices.forEach(function (c, i) {
      var isChosen = rec.choice === i;
      var isAnswer = q.answer === i;
      var cls = "choice";
      if (locked) cls += " is-locked";
      if (locked && isAnswer) cls += " is-correct";
      if (answered && isChosen && !isAnswer) cls += " is-wrong";
      var tag = null;
      if (locked && isAnswer) tag = answered && isChosen ? "正解・あなたの回答" : "正解";
      else if (answered && isChosen) tag = "あなたの回答";

      list.appendChild(h("li", null,
        h("button", {
          class: cls,
          type: "button",
          "aria-pressed": isChosen ? "true" : "false",
          "aria-disabled": locked ? "true" : null,
          onclick: function () { choose(dayKey, day, it, i); }
        }, [
          h("span", { class: "letter", "aria-hidden": "true", text: LETTERS[i] }),
          h("span", { class: "ctext" }, [
            h("span", { class: "sr-only", text: "選択肢" + LETTERS[i] + "：" }),
            h("span", { class: "c-en", lang: "en", text: c.text }),
            rec.revealed ? h("span", { class: "c-ja", text: c.ja }) : null
          ]),
          tag ? h("span", { class: "tag", text: tag }) : null
        ])));
    });

    /* 結果と解説 */
    var feedback = null;
    if (answered) {
      var ok = rec.choice === q.answer;
      feedback = h("div", { class: "feedback " + (ok ? "ok" : "ng"), id: "feedback" }, [
        h("p", { class: "fb-title", text: ok ? "○ 正解です！" : "× 不正解です。正解は " + LETTERS[q.answer] + " です。" }),
        h("div", { class: "fb-body" }, [h("h3", { text: "解説" }), h("p", { text: q.explanation })])
      ]);
    } else if (rec.revealed) {
      feedback = h("div", { class: "feedback", id: "feedback" }, [
        h("p", { class: "fb-title", text: "答えを確認しました。正解は " + LETTERS[q.answer] + " です。" }),
        h("div", { class: "fb-body" }, [
          h("h3", { text: "解説" }),
          h("p", { text: q.explanation }),
          h("p", { class: "dlg-note", text: "この問題は「未回答」として扱われます。もう一度解くには「この問題をやり直す」を押してください。" })
        ])
      ]);
    }

    /* 操作ボタン */
    var actions = h("div", { class: "actions" });
    if (!rec.revealed) {
      actions.appendChild(h("button", {
        class: "btn btn-secondary", type: "button",
        onclick: function () { reveal(dayKey, q); }
      }, "答えを見る（英文・日本語訳）"));
    }
    if (locked) {
      actions.appendChild(h("button", {
        class: "btn btn-quiet", type: "button",
        onclick: function () { retry(dayKey, q); }
      }, "この問題をやり直す"));
    }

    var card = h("section", { class: "qcard" }, [
      h("div", { class: "sec-head" }, [
        h("span", { class: "chip", text: "大問 " + it.secNumber }),
        h("span", { class: "sec-title", text: sec.title || defaults.title }),
        h("span", { class: "qnum", text: "問 " + (it.qIndex + 1) + " / " + inSection })
      ]),
      h("p", { class: "instruction", text: sec.instruction || defaults.instruction }),
      h("div", { class: "audio" }, [
        h("button", { id: "play-btn", class: "play", type: "button", onclick: function () { togglePlay(q); } }, [
          h("span", { class: "play-ico", "aria-hidden": "true" }),
          h("span", { class: "play-label", text: "音声を再生" })
        ]),
        h("p", { id: "audio-msg", class: "audio-msg", role: "status" }),
        h("p", { class: "hint", text: "何度でも聞けます。" + (Speech && Speech.supported ? "" : "（この環境では再生できません）") })
      ]),
      h("p", { class: "choices-label", text: "CHOICES　答えを選んでください" }),
      list,
      feedback,
      actions,
      rec.revealed ? buildTranscript(q) : null
    ]);

    var prev = n > 1
      ? h("a", { class: "btn btn-secondary", href: "#/day/" + dayKey + "/" + (n - 1), text: "‹ 前の問題" })
      : h("a", { class: "btn btn-secondary", href: "#/", text: "曜日選択へ" });
    var next = n < total
      ? h("a", { class: "btn btn-primary", href: "#/day/" + dayKey + "/" + (n + 1), text: "次の問題 ›" })
      : h("a", { class: "btn btn-primary", href: "#/day/" + dayKey + "/result", text: "結果を見る ›" });

    return h("div", { class: "wrap" }, [
      h("div", { class: "page has-navbar" }, [
        h("div", { class: "topbar" }, [
          h("a", { class: "btn-ghost", href: "#/" }, "‹ 曜日選択"),
          h("h1", { class: "topbar-title", tabindex: "-1", "data-focus": "", text: day.def.ja + (day.isDummy ? "（仮）" : "") }),
          h("button", { class: "btn-ghost", type: "button", onclick: openSettings, "aria-label": "音声の設定" }, "⚙ 設定")
        ]),
        buildProgress(dayKey, day, n),
        card
      ]),
      h("div", { class: "navbar" }, h("div", { class: "navbar-in" }, [prev, next]))
    ]);
  }

  /* ================= 操作 ================= */

  function choose(dayKey, day, it, i) {
    var rec = getRec(dayKey, it.q.id);
    if (rec.choice !== null || rec.revealed) return;
    rec.choice = i;
    var ok = i === it.q.answer;
    render({ keepScroll: true });
    announce(ok ? "正解です。" : "不正解です。正解は " + LETTERS[it.q.answer] + " です。");
    var fb = document.getElementById("feedback");
    if (fb && typeof fb.scrollIntoView === "function") {
      fb.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
    }
  }

  function reveal(dayKey, q) {
    var rec = getRec(dayKey, q.id);
    rec.revealed = true;
    render({ keepScroll: true });
    announce("答えと英文、日本語訳を表示しました。");
  }

  function retry(dayKey, q) {
    if (answers[dayKey]) delete answers[dayKey][q.id];
    render({ keepScroll: true });
    announce("この問題をやり直せます。");
  }

  /* ================= 音声の操作と表示 ================= */

  function audioErrorText(code) {
    switch (code) {
      case "no-start":
        return "音声が始まりませんでした。端末の音量やマナーモードを確認するか、「設定」で別の声を選んでください。";
      case "not-allowed":
        return "ブラウザが音声の再生を許可していません。もう一度、再生ボタンを押してください。";
      case "synthesis-unavailable":
      case "synthesis-failed":
        return "音声を作れませんでした。「設定」で別の声を選ぶか、通信状況を確認してください。";
      case "language-unavailable":
      case "voice-unavailable":
        return "選んだ声が使えません。「設定」で別の声を選んでください。";
      case "unsupported":
        return "このブラウザは音声の読み上げに対応していません。";
      default:
        return "再生できませんでした。もう一度お試しください。";
    }
  }

  function togglePlay(q) {
    if (!Speech || !Speech.supported) {
      var m = document.getElementById("audio-msg");
      if (m) m.textContent = audioErrorText("unsupported");
      return;
    }
    if (Speech.getState() === "playing") { Speech.stop(); return; }
    var plan = Speech.buildPlan({ lines: q.lines, question: q.question || null }, settings);
    Speech.play(plan, settings.rate);
  }

  function updatePlayUI() {
    var btn = document.getElementById("play-btn");
    if (!btn || !Speech) return;
    var playing = Speech.getState() === "playing";
    if (playing) btn.classList.add("is-playing"); else btn.classList.remove("is-playing");
    var label = btn.querySelector ? btn.querySelector(".play-label") : null;
    if (label) label.textContent = playing ? "停止（再生中）" : "音声を再生";
    btn.setAttribute("aria-label", playing ? "音声を停止する" : "音声を再生する");
    var msg = document.getElementById("audio-msg");
    if (msg) msg.textContent = (!playing && lastAudioError) ? audioErrorText(lastAudioError) : "";
  }

  var lastAudioError = null;

  /* ================= 結果画面 ================= */

  function renderResult(dayKey) {
    var day = dataInfo.days[dayKey];
    if (!day) return null;
    document.title = day.def.ja + " 結果｜ListenUp";
    var st = dayStats(dayKey, day);
    var unanswered = st.total - st.answered;

    var msg;
    if (st.answered === 0) msg = "まだ回答がありません。問題に戻って始めましょう。";
    else if (st.correct >= 6) msg = "すばらしい出来です！";
    else if (st.correct >= 4) msg = "よくできました。聞き直して確認しましょう。";
    else msg = "くり返し聞いて、少しずつ慣れていきましょう。";

    var rows = h("ul", { class: "result-rows" });
    [0, 1, 2].forEach(function (si) {
      var items = day.flat.filter(function (x) { return x.secIndex === si; });
      var c = 0;
      items.forEach(function (x) {
        var r = peekRec(dayKey, x.q.id);
        if (r && r.choice === x.q.answer) c += 1;
      });
      rows.appendChild(h("li", null, [
        h("span", { text: "大問" + (si + 1) + "　" + (day.flat.filter(function (x) { return x.secIndex === si; })[0].section.title || SECTION_DEFAULTS[si + 1].title) }),
        h("span", { text: c + " / " + items.length })
      ]));
    });

    var actions = h("div", { class: "result-actions" });
    var resume = firstUndone(dayKey, day);
    if (resume) {
      actions.appendChild(h("a", { class: "btn btn-primary btn-block", href: "#/day/" + dayKey + "/" + resume },
        "未回答の問題へ（問" + resume + "）"));
    }
    actions.appendChild(h("button", {
      class: "btn btn-secondary btn-block", type: "button",
      onclick: function () { delete answers[dayKey]; location.hash = "#/day/" + dayKey + "/1"; }
    }, "この日をもう一度やる"));
    actions.appendChild(h("a", { class: "btn btn-quiet btn-block", href: "#/" }, "曜日選択へ"));

    return h("div", { class: "page" }, [
      h("div", { class: "topbar" }, [
        h("a", { class: "btn-ghost", href: "#/day/" + dayKey + "/" + day.flat.length }, "‹ 問題にもどる"),
        h("h1", { class: "topbar-title", tabindex: "-1", "data-focus": "", text: day.def.ja + "の結果" }),
        h("span")
      ]),
      h("section", { class: "result-card" }, [
        h("p", { class: "result-score" }, [String(st.correct), h("small", { text: "/ " + st.total + " 問正解" })]),
        h("p", { class: "result-msg", text: msg }),
        unanswered > 0 && st.answered > 0
          ? h("p", { class: "result-msg", text: "未回答・答えを見た問題：" + unanswered + " 問" })
          : null,
        rows,
        actions
      ])
    ]);
  }

  /* ================= 音声の設定 ================= */

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = h("dialog", { class: "settings", "aria-label": "音声の設定" });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeSettings(); });
    document.body.appendChild(dialog);
    return dialog;
  }

  function closeSettings() {
    Speech && Speech.stop();
    if (dialog && typeof dialog.close === "function") dialog.close();
    else if (dialog) dialog.removeAttribute("open");
  }

  function voiceSelect(id, gender, current, onChange) {
    var voices = Speech.englishVoices();
    var preferred = voices.filter(function (v) { return Speech.isPreferred(v, gender); })
      .sort(function (a, b) { return Speech.prefRank(a, gender) - Speech.prefRank(b, gender); });
    var others = voices.filter(function (v) { return !Speech.isPreferred(v, gender); });

    function opt(v) {
      var o = h("option", { value: Speech.voiceKey(v), text: v.name + "（" + v.lang + "）" });
      if (Speech.voiceKey(v) === current) o.selected = true;
      return o;
    }
    var sel = h("select", { id: id }, [
      (function () {
        var o = h("option", { value: "auto", text: "自動（おすすめ順）" });
        if (current === "auto") o.selected = true;
        return o;
      })()
    ]);
    if (preferred.length) sel.appendChild(h("optgroup", { label: "おすすめ" }, preferred.map(opt)));
    if (others.length) sel.appendChild(h("optgroup", { label: "その他の英語音声" }, others.map(opt)));
    sel.addEventListener("change", function () { onChange(sel.value); });
    return sel;
  }

  function sampleVoice(gender) {
    var plan = Speech.buildPlan({
      lines: [{ speaker: "Sample", gender: gender, text: "Hello. This is a sample of the voice used in this app." }],
      question: null
    }, settings);
    Speech.play(plan, settings.rate);
  }

  function buildSettings() {
    var dlg = ensureDialog();
    var inner = h("div", { class: "dlg-in" });

    inner.appendChild(h("h2", { text: "音声の設定" }));

    if (!Speech || !Speech.supported) {
      inner.appendChild(h("p", { class: "dlg-note", text: "このブラウザは音声の読み上げに対応していません。" }));
    } else {
      var rateOut = h("output", { text: settings.rate.toFixed(2) + " 倍" });
      var rate = h("input", { id: "set-rate", type: "range", min: "0.6", max: "1.2", step: "0.05", value: String(settings.rate) });
      rate.addEventListener("input", function () {
        settings.rate = parseFloat(rate.value);
        rateOut.textContent = settings.rate.toFixed(2) + " 倍";
        saveSettings();
      });
      inner.appendChild(h("div", { class: "field" }, [
        h("label", { for: "set-rate" }, ["再生の速さ：", rateOut]),
        rate
      ]));

      [["female", "女性の声", "femaleVoice", "set-female"], ["male", "男性の声", "maleVoice", "set-male"]]
        .forEach(function (row) {
          var gender = row[0];
          var sel = voiceSelect(row[3], gender, settings[row[2]], function (val) {
            settings[row[2]] = val;
            saveSettings();
          });
          inner.appendChild(h("div", { class: "field" }, [
            h("label", { for: row[3], text: row[1] }),
            h("div", { class: "field-row" }, [
              sel,
              h("button", { class: "btn btn-secondary", type: "button", onclick: function () { sampleVoice(gender); } }, "試す")
            ])
          ]));
        });

      var count = Speech.englishVoices().length;
      inner.appendChild(h("p", { class: "dlg-note", text: count === 0
        ? "英語の音声が見つかりません。読み込み中の可能性があります。数秒待つか、ページを再読み込みしてください。"
        : "この端末で使える英語の音声：" + count + " 件。会話では、話者の性別に合わせて声が自動で選ばれます。" }));
    }

    inner.appendChild(h("button", { class: "btn btn-primary btn-block dlg-close", type: "button", onclick: closeSettings }, "閉じる"));
    dlg.replaceChildren(inner);
  }

  function openSettings() {
    buildSettings();
    var dlg = ensureDialog();
    if (typeof dlg.showModal === "function") {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
  }

  /* ================= 起動・終了 ================= */

  function setupListeners() {
    if (listenersReady) return;
    listenersReady = true;

    liveRegion = h("div", { id: "sr-live", class: "sr-only", "aria-live": "polite" });
    document.body.appendChild(liveRegion);

    window.addEventListener("hashchange", function () {
      if (!active) return;
      if (Speech) Speech.stop();
      lastAudioError = null;
      render();
    });

    if (Speech) {
      Speech.onChange(function (state, err) {
        lastAudioError = err || null;
        updatePlayUI();
      });
      Speech.onVoicesChanged(function () {
        if (dialog && dialog.open) buildSettings();
      });
    }

    // 画面を閉じたり、別のアプリに切り替えたりしたときは音声を止める
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && Speech) Speech.stop();
    });
    window.addEventListener("pagehide", function () { if (Speech) Speech.stop(); });
  }

  // ログイン後に auth.js から呼ばれる。問題データ(window.LISTENING_DATA)は読み込み済みであること。
  function start(info) {
    session = info || {};
    setupListeners();
    answers = {};
    lastAudioError = null;
    dataInfo = validateData(window.LISTENING_DATA);
    active = true;
    render();
  }

  // ログアウト時・ログイン切れ時に呼ばれる。画面と回答の記録をすべて消す。
  function stop() {
    active = false;
    if (Speech) Speech.stop();
    answers = {};
    lastAudioError = null;
    dataInfo = { errors: [], days: {}, weekLabel: "" };
    session = null;
    if (dialog) {
      try { if (dialog.open && typeof dialog.close === "function") dialog.close(); } catch (e) { /* 無視 */ }
      dialog.remove();
      dialog = null;
    }
    if (liveRegion) liveRegion.textContent = "";
    root.replaceChildren();
  }

  window.ListenUpApp = { start: start, stop: stop };
})();
