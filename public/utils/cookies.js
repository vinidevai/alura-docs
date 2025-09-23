function setCookie(key, value) {
  document.cookie = `${key}=${value};path=/`;
}

function getCookie(key) {
  return document.cookie
  .split('; ')
  .find((cookie) => cookie.startsWith(`${key}=`))
  ?.split('=')[1];
}

function delCookie(key) {
  document.cookie = `${key}=; expires=Thu, Jan 1970 00:00:00`
}

export { setCookie, getCookie, delCookie };