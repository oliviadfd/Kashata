/* ============================================================
   CONTINUE button — opens the link ONLY in external Google Chrome.
   Never inside Facebook / Instagram / Messenger / Telegram etc.,
   and never falls back to opening the link inside the in-app browser.
   ============================================================ */

var TARGET_URL = "https://viralvideoreels12.blogspot.com/2026/09/eeds.html?m=1";

/* True when the page is running inside a social app's built-in browser. */
function isInApp(ua) {
  return /FBAN|FBAV|Instagram|Messenger|TelegramBot|Telegram|\bLine\b|Snapchat|Twitter|Pinterest|Tumblr|MicroMessenger/i.test(ua);
}

/* Chrome-only handoff URL. Returns null when there is no reliable one. */
function getExternalUrl(ua, url) {
  url = url || TARGET_URL;
  var bare = url.replace(/^https?:\/\//, "");

  /* Android: intent:// deep link pinned to the Chrome package. */
  if (/android/i.test(ua)) {
    return "intent://" + bare + "#Intent;scheme=https;package=com.android.chrome;end";
  }

  /* iPhone / iPad: googlechromes:// scheme (works when Chrome is installed). */
  if (/iphone|ipad|ipod/i.test(ua)) {
    return "googlechromes://" + bare;
  }

  /* Desktop browsers have no reliable Chrome-only handoff. */
  return null;
}

/* Runs ONLY when the button is clicked — nothing happens on page load. */
function continueToVideos() {
  var ua = navigator.userAgent || "";

  /* iPadOS 13+ reports itself as "MacIntel"; make it look like an iPad. */
  var platformUa = (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ? ua + " iPad"
    : ua;

  var externalUrl = getExternalUrl(platformUa);

  if (!externalUrl) {
    window.alert("শুধু Chrome-এ খুলতে Android বা iPhone থেকে এই বোতাম চাপুন। ফোনে Chrome ইনস্টল থাকতে হবে।");
    return;
  }

  /* No web-navigation fallback on purpose: if Chrome is blocked or
     missing, the link must not open inside the in-app browser. */
  window.location.href = externalUrl;
}

/* Wire the button (skipped when there is no DOM, e.g. in tests). */
if (typeof document !== "undefined" && typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("continueBtn");
    if (btn) btn.addEventListener("click", continueToVideos);
  });
}
