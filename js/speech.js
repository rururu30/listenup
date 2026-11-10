/*
 * 音声モジュール（Web Speech API）
 *
 * - 話者の性別に合わせて端末内の英語音声を自動で割り当てる
 * - 長い英文は文ごとに分けて順番に再生する（途中で切れにくくする）
 * - 再生・停止・状態通知だけを担当し、画面のことは知らない
 *
 * 将来、音声ファイル方式へ切り替える場合は、このファイルと同じ
 * 公開関数（buildPlan / play / stop / onChange など）を持つ
 * 別モジュールに差し替えられるようにしてあります。
 */
(function (global) {
  "use strict";

  var synth = null;
  try {
    if ("speechSynthesis" in global && "SpeechSynthesisUtterance" in global) {
      synth = global.speechSynthesis;
    }
  } catch (e) {
    synth = null;
  }

  // 声の優先順位（小文字・名前の先頭一致）。実機で聞き取りやすかった声を先頭に置く。
  var PREFERRED = {
    female: [
      "google uk english female", "catherine", "karen", "moira",
      "samantha", "fiona", "tessa", "serena", "kate", "susan", "zira"
    ],
    male: [
      "google uk english male", "daniel", "arthur", "aaron", "gordon", "eddy",
      "alex", "fred", "oliver", "thomas", "david", "mark", "rishi"
    ]
  };

  var token = 0;
  var state = "idle";
  var lastError = null;
  var stateListeners = [];
  var voiceListeners = [];

  function emitState() {
    stateListeners.forEach(function (fn) {
      try { fn(state, lastError); } catch (e) { /* 通知先のエラーは無視 */ }
    });
  }

  function setState(next, err) {
    state = next;
    lastError = err || null;
    emitState();
  }

  function normName(v) {
    return String(v.name || "").toLowerCase().replace(/\s*\(.*$/, "").trim();
  }

  function isEnglish(v) {
    return /^en([-_]|$)/i.test(v.lang || "");
  }

  function voiceKey(v) {
    return v.voiceURI || v.name;
  }

  function englishVoices() {
    if (!synth) return [];
    var all = [];
    try { all = synth.getVoices() || []; } catch (e) { all = []; }
    return all.filter(isEnglish);
  }

  function prefRank(v, gender) {
    var n = normName(v);
    var list = PREFERRED[gender];
    for (var i = 0; i < list.length; i++) {
      if (n.indexOf(list[i]) === 0) return i;
    }
    return -1;
  }

  function isPreferred(v, gender) {
    return prefRank(v, gender) >= 0;
  }

  // 指定の性別に使う声の候補を、優先順に返す
  function voicesForGender(gender, override) {
    var all = englishVoices();
    var out = [];
    var names = {};
    // 同じ名前の声（例: Daniel と Daniel (Enhanced)）は1つにまとめ、2人が同じ声にならないようにする
    function add(v) {
      var n = normName(v);
      if (out.indexOf(v) >= 0 || names[n]) return;
      names[n] = true;
      out.push(v);
    }

    if (override && override !== "auto") {
      all.forEach(function (v) { if (voiceKey(v) === override) add(v); });
    }
    PREFERRED[gender].forEach(function (p) {
      all.forEach(function (v) { if (normName(v).indexOf(p) === 0) add(v); });
    });
    if (out.length === 0) {
      var other = gender === "female" ? "male" : "female";
      all.forEach(function (v) { if (prefRank(v, other) < 0) add(v); });
    }
    return out;
  }

  // 英文を文ごとに分ける（Mr. や a.m. の後では分けない）
  var ABBR = /\b(Mr|Mrs|Ms|Dr|St|Prof|Jr|Sr|a\.m|p\.m|etc)\.$/i;

  function splitSentences(text) {
    var raw = String(text).match(/[^.!?]+[.!?]*["')\]]*\s*/g) || [String(text)];
    var merged = [];
    raw.forEach(function (piece) {
      var t = piece.replace(/\s+/g, " ").trim();
      if (!t) return;
      if (merged.length && ABBR.test(merged[merged.length - 1])) {
        merged[merged.length - 1] += " " + t;
      } else {
        merged.push(t);
      }
    });
    // 極端に長い文はカンマで分ける
    var result = [];
    merged.forEach(function (s) {
      if (s.length <= 220) { result.push(s); return; }
      var parts = s.split(/,\s+/);
      var buf = "";
      parts.forEach(function (p, i) {
        var piece = p + (i < parts.length - 1 ? "," : "");
        if ((buf + " " + piece).length > 180 && buf) {
          result.push(buf.trim());
          buf = piece;
        } else {
          buf = (buf + " " + piece).trim();
        }
      });
      if (buf) result.push(buf);
    });
    return result;
  }

  // 問題ごとの声の並び（同じ問題の中では固定、ページを開き直すと変わる）
  var shuffleCache = {};

  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // 手動で声を選んでいるときは、その声を先頭に固定し、残りだけ並べ替える
  function orderedPool(gender, override, key) {
    var pool = voicesForGender(gender, override);
    var ck = key ? (key + "|" + gender + "|" + (override || "auto")) : null;
    if (ck && shuffleCache[ck]) {
      var cached = shuffleCache[ck];
      var same = cached.length === pool.length && cached.every(function (v) { return pool.indexOf(v) >= 0; });
      if (same) return cached;
    }
    var head = [];
    if (override && override !== "auto") {
      head = pool.filter(function (v) { return voiceKey(v) === override; });
    }
    var rest = pool.filter(function (v) { return head.indexOf(v) < 0; });
    var res = head.concat(shuffled(rest));
    if (ck) shuffleCache[ck] = res;
    return res;
  }

  /*
   * 再生計画を作る
   * spec = { lines: [{speaker, gender, text}], question: {text, gender?} | null, key?: 問題ID }
   *   key があると、その問題の声の並びを覚えて再生のたびに同じ声を使う（無いときは毎回ランダム）
   * settings = { femaleVoice, maleVoice }（"auto" か声のキー）
   * 戻り値 = [{ text, voice, pitch }]
   */
  function buildPlan(spec, settings) {
    settings = settings || {};
    var pools = {
      female: orderedPool("female", settings.femaleVoice, spec.key || null),
      male: orderedPool("male", settings.maleVoice, spec.key || null)
    };
    var counters = { female: 0, male: 0 };
    var assigned = {};

    function assign(key, gender) {
      if (assigned[key]) return assigned[key];
      var pool = pools[gender];
      var idx = counters[gender]++;
      var voice = null;
      var pitch = 1;
      if (pool.length) {
        voice = pool[idx % pool.length];
        // 同じ声を使い回すときは、少し高さを変えて区別しやすくする
        if (idx >= pool.length) pitch = ((idx - pool.length) % 2 === 0) ? 1.15 : 0.88;
      } else {
        var otherPool = pools[gender === "female" ? "male" : "female"];
        if (otherPool.length) {
          voice = otherPool[idx % otherPool.length];
          pitch = gender === "female" ? 1.25 : 0.75;
        }
      }
      assigned[key] = { voice: voice, pitch: pitch };
      return assigned[key];
    }

    var plan = [];
    var femaleCount = 0;
    var maleCount = 0;
    var seen = {};
    (spec.lines || []).forEach(function (line) {
      var key = line.gender + "|" + line.speaker;
      if (!seen[key]) {
        seen[key] = true;
        if (line.gender === "male") maleCount++; else femaleCount++;
      }
    });

    (spec.lines || []).forEach(function (line) {
      var gender = line.gender === "male" ? "male" : "female";
      var a = assign(gender + "|" + line.speaker, gender);
      splitSentences(line.text).forEach(function (s) {
        plan.push({ text: s, voice: a.voice, pitch: a.pitch });
      });
    });

    if (spec.question && spec.question.text) {
      // 出題者の声は、会話の話者と重ならないよう、使用の少ない性別を選ぶ
      var qGender = spec.question.gender;
      if (qGender !== "male" && qGender !== "female") {
        qGender = maleCount < femaleCount ? "male" : "female";
      }
      var qa = assign(qGender + "|__question__", qGender);
      splitSentences(spec.question.text).forEach(function (s) {
        plan.push({ text: s, voice: qa.voice, pitch: qa.pitch });
      });
    }
    return plan;
  }

  function stop() {
    token += 1;
    if (synth) {
      try { synth.cancel(); } catch (e) { /* 無視 */ }
    }
    setState("idle");
  }

  function play(plan, rate) {
    if (!synth) { setState("idle", "unsupported"); return; }
    if (!plan || !plan.length) return;

    token += 1;
    var my = token;
    try { synth.cancel(); } catch (e) { /* 無視 */ }

    var remaining = plan.length;
    var started = false;
    setState("playing");

    function fail(code) {
      token += 1;
      try { synth.cancel(); } catch (e) { /* 無視 */ }
      setState("idle", code || "unknown");
    }

    plan.forEach(function (seg) {
      var u = new global.SpeechSynthesisUtterance(seg.text);
      if (seg.voice) u.voice = seg.voice;
      u.lang = (seg.voice && seg.voice.lang) ? seg.voice.lang : "en-US";
      u.rate = rate || 1;
      u.pitch = seg.pitch || 1;
      u.volume = 1;
      u.onstart = function () { if (my === token) started = true; };
      u.onend = function () {
        if (my !== token) return;
        remaining -= 1;
        if (remaining <= 0) setState("idle");
      };
      u.onerror = function (e) {
        if (my !== token) return;
        var code = e && e.error;
        if (code === "canceled" || code === "interrupted") return;
        fail(code);
      };
      synth.speak(u);
    });

    try { if (synth.paused) synth.resume(); } catch (e) { /* 無視 */ }

    // しばらく待っても始まらないときは、案内を出せるように終了扱いにする
    setTimeout(function () {
      if (my === token && !started && state === "playing") {
        var speaking = false;
        try { speaking = synth.speaking; } catch (e) { speaking = false; }
        if (!speaking) fail("no-start");
      }
    }, 5000);
  }

  function onVoicesChanged(fn) { voiceListeners.push(fn); }

  function fireVoices() {
    voiceListeners.forEach(function (fn) {
      try { fn(); } catch (e) { /* 無視 */ }
    });
  }

  if (synth) {
    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", fireVoices);
    } else {
      synth.onvoiceschanged = fireVoices;
    }
  }

  global.Speech = {
    supported: !!synth,
    buildPlan: buildPlan,
    play: play,
    stop: stop,
    getState: function () { return state; },
    onChange: function (fn) { stateListeners.push(fn); },
    onVoicesChanged: onVoicesChanged,
    englishVoices: englishVoices,
    voiceKey: voiceKey,
    isPreferred: isPreferred,
    prefRank: prefRank,
    splitSentences: splitSentences
  };
})(window);
