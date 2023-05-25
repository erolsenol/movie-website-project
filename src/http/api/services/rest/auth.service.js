import { hiringConnector, idenfitConnector, nocConnector, movieConnector } from '../../../clients'
import { TokenUtils } from '@/utils/token.utils'
import { StatusCodes, ACCEPTED, OK, UNAUTHORIZED } from 'http-status-codes'
import { NO_REFRESH_TOKEN } from '../../../response/status/idenfit/'
import store from '@/store'

const AUTH_TOKEN_PREFIX = 'Bearer '

class NetworkError {
  constructor(errorCode, message) {
    this.message = message
    this.errorCode = errorCode
  }
}

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

class RefreshTokenNotFoundError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

class LogOutError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

/**
 * @author erolsnl@gmail.com
 * @type {{logout(): void, login: AuthService.login, refreshToken: (function(): Promise<any>)}}
 */

const AuthService = {
  /**
   * Login the user and store the access token to TokenService.
   * @returns access_token
   * @throws AuthenticationError
   **/
  login: async function (payload) {
    return new Promise(async (resolve, reject) => {
      await idenfitConnector
        .login(payload)
        .then(({ headers, data, status }) => {
          if (status === OK) {
            const token = headers.authorization.replace(AUTH_TOKEN_PREFIX, '')
            if (data.webAccess) {
              this.loginOnFirebase(token)
                .then(() => {
                  resolve({
                    token: {
                      accessToken: token,
                      refreshToken: headers['refresh-token']
                    },
                    user: data
                  })
                })
                .catch(e => reject(e))
            } else {
              resolve({
                token: {
                  accessToken: token,
                  refreshToken: headers['refresh-token']
                },
                user: data
              })
            }
          } else {
            reject(false)
          }
        })
        .catch(error => {
          reject(new AuthenticationError(-401, error.toString()))
        })
    })
  },

  /**
   * Refresh the access token.
   **/
  refreshToken: function () {
    return new Promise(async function (resolve, reject) {
      if (store.state.authToken) {
        idenfitConnector.setRemoveHeaders()
        await idenfitConnector
          .refreshToken()
          .then(({ headers, status, data }) => {
            if (status === OK) {
              if (data.error && data.error.code === NO_REFRESH_TOKEN) {
                TokenUtils.removeAllStorage()
                idenfitConnector.setRemoveHeaders()
                hiringConnector.setRemoveHeaders()
                nocConnector.setRemoveHeaders()
                hiringConnector.unmount401Interceptor()
                nocConnector.unmount401Interceptor()
                idenfitConnector.unmount401Interceptor()
                reject(new RefreshTokenNotFoundError(null, 'No refresh token found in idenfit'))
              }
            } else if (status === UNAUTHORIZED) {
              reject(new AuthenticationError(null, 'No refresh token found in idenfit'))
            } else if (status === ACCEPTED) {
              let accessToken = headers.authorization.substring(AUTH_TOKEN_PREFIX.length)

              // firebase logout and re-login
              AuthService.logOutOnFirebase()
                .then(() => {
                  AuthService.loginOnFirebase(accessToken)
                    .then(() => {
                      resolve(accessToken)
                    })
                    .catch(e => reject(e))
                })
                .catch(e => reject(e))
            }
          })
          .catch(error => reject(new AuthenticationError(error.response.status, error.response.data)))
      } else {
        reject(new AuthenticationError(null, 'Refresh token is removed'))
      }
    })
  },

  /**
   * Logout the current user by removing the token from storage.
   **/
  logout: function () {
    return new Promise(async function (resolve, reject) {
      await idenfitConnector
        .logout()
        .then(({ status }) => {
          if (status === ACCEPTED) {
            AuthService.logOutOnFirebase()
              .then(() => {
                resolve(true)
              })
              .catch(e => {
                reject(e)
              })
          } else {
            reject(status)
          }
        })
        .catch(e => {
          reject(new LogOutError(-20002, e.toString()))
        })
    })
  }
}

export default AuthService

export { AuthService, AuthenticationError, LogOutError, RefreshTokenNotFoundError, NetworkError }
