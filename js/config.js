/*
 * Supabase の接続設定
 *
 * ここに入れてよいのは、次の「公開用」の2つだけです。
 *   supabaseUrl : プロジェクトURL           例) https://xxxxxxxx.supabase.co
 *   supabaseKey : Publishable key           例) sb_publishable_xxxxxxxx
 *                 （古い anon キー〈eyJ から始まる長い文字列〉でも可）
 *
 * 絶対に入れないでください：
 *   Secret key（sb_secret_ で始まる）／ service_role キー
 *   → 全権限を持つ鍵です。入れた場合、アプリは検出して動作を止めます。
 *
 * 取得方法は SUPABASE_SETUP.md を参照してください。
 */
window.LISTENUP_CONFIG = {
  supabaseUrl: "https://baruqemcrvxvrguizhcj.supabase.co",
  supabaseKey: "sb_publishable_uMwvlU-zWNmAuyOHBucyNw_BJqmOi58"
};
