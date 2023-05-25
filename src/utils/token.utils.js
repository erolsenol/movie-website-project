const TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
const LANG_KEY = process.env.LANG_KEY

/**
 * @description StoreHelper class is the facade helper for the localStorage API
 * @author erolsnl@gmail.com
 */
const TokenUtils = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  saveToken(accessToken) {
    let token = accessToken.replace('Bearer ', '')
    localStorage.setItem(TOKEN_KEY, token)
  },
  saveUserLanguage(language) {
    let lang
    !language ? (lang = 'en') : (lang = language)
    localStorage.setItem(LANG_KEY, lang)
    sessionStorage.setItem(LANG_KEY, lang)
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },
  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
  removeAllStorage() {
    localStorage.clear()
    sessionStorage.clear()
  },
  setACL() {
    let token = Vue.$jwt.decode()
    if (token) {
      let authorities = token.authorities
      let authorize = {}
      Object.keys(authorities).forEach(module => {
        let privilege = authorities[module]
        authorize[module] = new ACL(module, privilege)
      })

      return authorize
    } else {
      return []
    }
  }
}

export { TokenUtils }
