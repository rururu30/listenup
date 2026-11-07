/*
 * ListenUp — ログイン（Supabase Auth）
 *
 * - メールアドレスとパスワードでログイン／ログアウトする
 * - ログイン状態はブラウザに保持され、再読み込みしても続く
 * - 未ログインの間は、アプリ本体（js/app.js の画面）も問題データも読み込まない
 * - 新規登録の画面は無い（Supabase側でも新規登録を無効にする）
 * - フロントエンドに置くのは、公開用のURLとキーだけ（js/config.js）
 */
(function () {
  "use strict";

  var root = document.getElementById("app");
  var cfg = window.LISTENUP_CONFIG || {};
  var client = null;
  var entered = false;        // アプリ本体を開始済みか
  var entering = false;       // 開始処理の最中か
  var dataScript = null;

  /* ---------- 小さな道具 ---------- */

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

  function show(node, title) {
    document.title = (title ? title + "｜" : "") + "ListenUp";
    root.replaceChildren(node);
    window.scrollTo(0, 0);
    var f = document.querySelector("[data-focus]");
    if (f && typeof f.focus === "function") f.focus({ preventScroll: true });
  }

  function hero(sub) {
    return h("header", { class: "hero" }, [
      h("p", { class: "eyebrow", text: "ENGLISH LISTENING" }),
      h("h1", { class: "hero-title", tabindex: "-1", "data-focus": "", text: "ListenUp" }),
      sub ? h("p", { class: "hero-sub", text: sub }) : null
    ]);
  }

  /* ---------- 設定の検査 ---------- */

  function base64urlDecode(str) {
    var b = str.replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) b += "=";
    return atob(b);
  }

  // 鍵の種類を判定する。"secret"（使ってはいけない）／"ok"／"unknown"
  function inspectKey(key) {
    if (/^sb_secret_/i.test(key)) return "secret";
    if (/^sb_publishable_/i.test(key)) return "ok";
    var parts = key.split(".");
    if (parts.length === 3) {
      try {
        var payload = JSON.parse(base64urlDecode(parts[1]));
        if (payload && payload.role === "service_role") return "secret";
        if (payload && payload.role === "anon") return "ok";
      } catch (e) { /* 形式不明として扱う */ }
    }
    return "unknown";
  }

  function configProblem() {
    var url = String(cfg.supabaseUrl || "").trim();
    var key = String(cfg.supabaseKey || "").trim();
    if (!url || !key) return "empty";
    if (!/^https:\/\/[^\s/]+\/?$/i.test(url)) return "badurl";
    if (inspectKey(key) === "secret") return "secret";
    return null;
  }

  function renderNotice(title, lines, kind) {
    var page = h("div", { class: "page" }, [
      hero(),
      h("div", { class: "notice" + (kind === "error" ? " is-error" : ""), role: "alert" }, [
        h("p", { class: "notice-title", text: title })
      ].concat(lines.map(function (t) { return h("p", { text: t }); })))
    ]);
    show(page, title);
  }

  /* ---------- ログイン画面 ---------- */

  function loginErrorText(err) {
    if (!err) return "ログインできませんでした。もう一度お試しください。";
    var code = err.code || "";
    var status = err.status;
    var msg = String(err.message || "");

    if (code === "invalid_credentials" || /invalid login credentials/i.test(msg)) {
      return "メールアドレスまたはパスワードが正しくありません。入力をご確認ください。";
    }
    if (code === "email_not_confirmed" || /email not confirmed/i.test(msg)) {
      return "メールアドレスの確認が済んでいません。Supabaseでユーザーを作るとき、「Auto Confirm User」にチェックを入れたかご確認ください。";
    }
    if (code === "over_request_rate_limit" || status === 429) {
      return "短い時間に何度も試したため、一時的に制限されています。しばらく待ってから、もう一度お試しください。";
    }
    if (code === "user_banned") {
      return "このアカウントは利用が停止されています。";
    }
    if (code === "email_provider_disabled") {
      return "メールでのログインが無効になっています。Supabaseの Sign In / Providers で、Email を有効にしてください。";
    }
    if (err.name === "AuthRetryableFetchError" || status === 0 || /failed to fetch|networkerror|load failed|network request failed/i.test(msg)) {
      return "通信できませんでした。インターネットへの接続をご確認のうえ、もう一度お試しください。";
    }
    if (typeof status === "number" && status >= 500) {
      return "Supabase側で問題が起きているようです。しばらくしてから、もう一度お試しください。";
    }
    return "ログインできませんでした。もう一度お試しください。（エラー: " + (code || msg || "不明") + "）";
  }

  function showLogin(message, kind) {
    var email = h("input", {
      id: "login-email", name: "email", type: "email", inputmode: "email",
      autocomplete: "username", autocapitalize: "none", spellcheck: "false", required: true
    });
    var password = h("input", {
      id: "login-password", name: "password", type: "password",
      autocomplete: "current-password", required: true
    });
    var toggle = h("input", { id: "login-show", type: "checkbox" });
    toggle.addEventListener("change", function () {
      password.type = toggle.checked ? "text" : "password";
    });
    var errorBox = h("p", { class: "form-error", id: "login-error", role: "alert" });
    var submit = h("button", { class: "btn btn-primary btn-block", type: "submit", text: "ログイン" });

    if (message) {
      errorBox.textContent = message;
      if (kind === "info") errorBox.classList.add("is-info");
    }

    var form = h("form", { class: "login-card", novalidate: true }, [
      h("h2", { class: "login-title", text: "ログイン" }),
      h("div", { class: "form-field" }, [h("label", { for: "login-email", text: "メールアドレス" }), email]),
      h("div", { class: "form-field" }, [h("label", { for: "login-password", text: "パスワード" }), password]),
      h("label", { class: "check-row", for: "login-show" }, [toggle, "パスワードを表示する"]),
      errorBox,
      submit,
      h("p", { class: "login-note", text: "このアプリは本人専用です。新規登録はできません。" })
    ]);

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var e = email.value.trim();
      var p = password.value;
      errorBox.textContent = "";
      errorBox.classList.remove("is-info");
      if (!e || !p) {
        errorBox.textContent = "メールアドレスとパスワードを入力してください。";
        (e ? password : email).focus();
        return;
      }
      submit.disabled = true;
      submit.textContent = "ログイン中…";

      var finish = function () {
        submit.disabled = false;
        submit.textContent = "ログイン";
      };

      client.auth.signInWithPassword({ email: e, password: p }).then(function (res) {
        if (res && res.error) {
          errorBox.textContent = loginErrorText(res.error);
          password.value = "";
          finish();
          password.focus();
          return;
        }
        var session = res && res.data && res.data.session;
        password.value = "";
        if (!session) {
          errorBox.textContent = "ログインできませんでした。もう一度お試しください。";
          finish();
          return;
        }
        enter(session);
      }, function (err) {
        errorBox.textContent = loginErrorText(err);
        finish();
      });
    });

    var page = h("div", { class: "page" }, [hero("英語リスニング練習。ログインして始めましょう。"), form]);
    show(page, "ログイン");
  }

  /* ---------- アプリ本体の開始と終了 ---------- */

  function loadData() {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = "data/questions.js?t=" + Date.now();   // 毎週の差し替えが古いキャッシュに隠れないようにする
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error("load")); };
      dataScript = s;
      document.head.appendChild(s);
    });
  }

  function enter(session) {
    if (entered || entering) return;
    entering = true;
    var email = session && session.user && session.user.email;
    loadData().then(function () {
      entering = false;
      if (!client) return;
      entered = true;
      window.ListenUpApp.start({ email: email || "", onLogout: logout });
    }, function () {
      entering = false;
      renderNotice("問題データを読み込めませんでした", [
        "data/questions.js が見つからないか、通信に失敗しました。",
        "ページを再読み込みしても直らない場合は、ファイルの置き場所をご確認ください。"
      ], "error");
    });
  }

  function leave(message, kind) {
    var wasEntered = entered;
    entered = false;
    entering = false;
    if (window.ListenUpApp) window.ListenUpApp.stop();
    if (dataScript && dataScript.parentNode) dataScript.parentNode.removeChild(dataScript);
    dataScript = null;
    try { delete window.LISTENING_DATA; } catch (e) { window.LISTENING_DATA = undefined; }
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* 無視 */ }
    if (wasEntered || message !== undefined) showLogin(message, kind);
    else showLogin();
  }

  function logout() {
    var done = function () { leave("ログアウトしました。", "info"); };
    try {
      client.auth.signOut().then(done, done);
    } catch (e) {
      done();
    }
  }

  /* ---------- 起動 ---------- */

  function boot() {
    var problem = configProblem();
    if (problem === "empty") {
      renderNotice("Supabaseの設定がまだ入力されていません", [
        "js/config.js を開き、Project URL と Publishable key を入力してください。",
        "手順は SUPABASE_SETUP.md にあります。"
      ]);
      return;
    }
    if (problem === "badurl") {
      renderNotice("Project URL の形式が正しくありません", [
        "js/config.js の supabaseUrl は「https://xxxxxxxx.supabase.co」の形で入力してください（末尾に余計なパスを付けません）。"
      ], "error");
      return;
    }
    if (problem === "secret") {
      renderNotice("秘密の鍵が設定されています", [
        "js/config.js に、Secret key または service_role キーが入っています。これらは全権限を持つ鍵で、ブラウザ側のコードに入れてはいけません。",
        "config.js からすぐに削除し、Supabaseの Settings → API Keys で、その鍵を再発行（ローテーション）してください。",
        "代わりに、公開用の Publishable key（sb_publishable_ で始まる）を入れてください。"
      ], "error");
      return;
    }
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      renderNotice("ログイン機能を読み込めませんでした", [
        "インターネットに接続されているかご確認のうえ、ページを再読み込みしてください。"
      ], "error");
      return;
    }

    client = window.supabase.createClient(String(cfg.supabaseUrl).trim(), String(cfg.supabaseKey).trim(), {
      auth: {
        persistSession: true,        // ログイン状態をブラウザに保持する
        autoRefreshToken: true,      // 有効期限が近づいたら自動で更新する
        detectSessionInUrl: false    // このアプリは URL 経由のログインを使わない（#/ の画面遷移と衝突させない）
      }
    });

    // 他の端末・タブでのログアウトや、更新に失敗したときに、画面を閉じる。
    // コールバックの中で Supabase の別の処理を直接呼ぶと止まることがあるため、setTimeout で外に出す。
    client.auth.onAuthStateChange(function (event) {
      setTimeout(function () {
        if (event === "SIGNED_OUT" && (entered || entering)) {
          leave("ログインの有効期限が切れたか、ログアウトされました。もう一度ログインしてください。", "info");
        }
      }, 0);
    });

    client.auth.getSession().then(function (res) {
      var session = res && res.data && res.data.session;
      if (session) enter(session);
      else showLogin();
    }, function () {
      showLogin("通信できませんでした。インターネットへの接続をご確認のうえ、ページを再読み込みしてください。");
    });
  }

  boot();
})();
