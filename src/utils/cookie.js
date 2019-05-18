export default new class cookie {
  setCookie(name, value, m) {
    var d = new Date();
    d.setTime(d.getTime() + 1000 * m); //24 * 60 * 60 * 1000 * days
    window.document.cookie =
      name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }

  getCookie(name) {
    var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }

  deleteCookie(name) {
    this.set(name, "", -1);
  }
}();
