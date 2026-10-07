// Change this URL to the destination you want to open.
const TARGET_URL = "https://t.co/C68QrlA5oX";

const popup = document.getElementById("popup");
const openPopupButton = document.getElementById("openPopupButton");
const goBackButton = document.getElementById("goBackButton");
const continueButton = document.getElementById("continueButton");

function isInAppBrowser() {
  const userAgent = navigator.userAgent || "";

  return /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Telegram|Line\b|Snapchat|Twitter|Pinterest|Tumblr|MicroMessenger/i.test(
    userAgent
  );
}

function openPopup() {
  popup.hidden = false;
  document.body.style.overflow = "hidden";
  continueButton.focus();
}

function closePopup() {
  popup.hidden = true;
  document.body.style.overflow = "";
  openPopupButton.focus();
}

function openExternal(url) {
  const userAgent = navigator.userAgent || "";
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);

  if (isInAppBrowser() && isAndroid) {
    const cleanUrl = url.replace(/^https?:\/\//, "");
    const fallbackUrl = encodeURIComponent(url);

    window.location.href =
      `intent://${cleanUrl}` +
      `#Intent;scheme=https;package=com.android.chrome;` +
      `S.browser_fallback_url=${fallbackUrl};end`;
    return;
  }

  if (isInAppBrowser() && isIOS) {
    const chromeUrl = url
      .replace(/^https:\/\//, "googlechromes://")
      .replace(/^http:\/\//, "googlechrome://");

    window.location.href = chromeUrl;

    window.setTimeout(function () {
      window.location.href = url;
    }, 1200);
    return;
  }

  window.location.href = url;
}

openPopupButton.addEventListener("click", openPopup);
goBackButton.addEventListener("click", closePopup);
continueButton.addEventListener("click", function () {
  openExternal(TARGET_URL);
});

popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    closePopup();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !popup.hidden) {
    closePopup();
  }
});
