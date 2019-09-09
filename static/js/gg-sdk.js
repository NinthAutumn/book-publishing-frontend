window.gapiOnLoadCallback = () => {
  window.gapi.load("auth2", () => {
    window.google_auth2 = window.gapi.auth2.init({
      client_id: "1011183696401-m674j5hnthaqc4m3hd44p3ms63uqbi0k.apps.googleusercontent.com",
      fetch_basic_profile: true,
      scope: "profile email"
    });
  });
  this.google_ready = true;
};
const installGoogleSdkScript = (d, s, id) => {
  if (d.getElementById(id)) {
    this.google_sdk_initialized = true;
    return;
  }
  let fjs = d.getElementsByTagName(s)[0];
  let js = d.createElement(s);
  js.id = id;
  js.src =
    "https://apis.google.com/js/platform.js?onload=gapiOnLoadCallback";
  fjs.parentNode.insertBefore(js, fjs);
};
installGoogleSdkScript(document, "script", "google-jssdk");
