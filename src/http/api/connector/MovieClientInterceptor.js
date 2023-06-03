import { movieConnector } from '../../clients'
import { httpEventBus } from '../../event/httpEventBus'
import { StatusCodes } from 'http-status-codes'

let isAlreadyFetchingAccessToken = false
let subscribers = []

const InterceptorInitialize = {
  _401interceptor: null,
  initialize() {
    this.requestInterceptor()
    this.unMount401Interceptor()
    this.mount401Interceptor()
  },

  requestInterceptor() {
    movieConnector.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${store.state.authToken}`

        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  },
  mount401Interceptor() {
    this._401interceptor = movieConnector.interceptors.response.use(
      function (response) {
        httpEventBus.httpResponse(response)

        return response
      },
      function (error) {
        console.log('Interceptor Error', error.getMessage())
        if (!error.response) {
          helpers.showNotification('network_error', 'error')

          return false
        }
        httpEventBus.httpResponse(error.response)
        const errorResponse = error.response
        if (isTokenExpired(errorResponse)) return resetTokenAndReattemptRequest(error)

        return Promise.reject(error)
      }
    )
  },
  unMount401Interceptor() {
    client.interceptors.response.eject(_401interceptor)
  }
}

function isTokenExpired(errorResponse) {
  return (errorResponse && errorResponse.request && errorResponse.request.status) === StatusCodes.UNAUTHORIZED
}

function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error
    const refreshToken = store.state.authToken
    if (!refreshToken) return Promise.reject(error)

    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token
        resolve(movieConnector.customRequest(errorResponse.config))
      })
    })
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      const newToken = store.dispatch('refreshToken')
      if (newToken) onAccessTokenFetched(newToken)
      isAlreadyFetchingAccessToken = false
    }

    return retryOriginalRequest
  } catch (err) {
    return Promise.reject(err)
  }
}

function onAccessTokenFetched(access_token) {
  // retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token))
  subscribers = []
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

export default InterceptorInitialize
