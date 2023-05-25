import axios from 'axios'
import { TokenUtils } from '../../../utils/token.utils'
import { StatusCodes } from 'http-status-codes'
import { httpEventBus } from '../../event/httpEventBus'
import Qs from 'qs'
import store from '../../../store'
import EventBus from '../../../bus/eventBus'

const paramsSerializer = params => Qs.stringify(params, { indices: false, arrayFormat: 'repeat' })

let client = null

const MovieConnector = {
  _401interceptor: null,

  init(baseUrl) {
    client = axios.create({ baseURL: baseUrl, timeout: 60000, paramsSerializer: paramsSerializer })
  },
  setHeader(fieldName, fieldValue) {
    client.defaults.headers.common[fieldName] = fieldValue
  },
  setAccessTokenToHeader() {
    this.setHeader('Authorization', `Bearer ${TokenUtils.getToken()}`)
  },
  setRefreshTokenToHeader() {
    this.setHeader('refresh-token', TokenUtils.getRefreshToken())
  },
  removeHeader() {
    client.defaults.headers.common = {}
  },
  getClient() {
    return this
  },
  getClient2() {
    return client
  },
  get(resource, config = {}) {
    return client.get(resource, config)
  },
  post(resource, data, config = {}) {
    return client.post(resource, data, config)
  },
  put(resource, data, config = {}) {
    return client.put(resource, data, config)
  },

  delete(resource, config = {}) {
    return client.delete(resource, config)
  },
  async customRequest(config) {
    return client(config)
  },
  async login(data) {
    return client.post('login', null, {
      params: {
        username: data.email,
        password: data.password
      },
      headers: {
        captcha: data.captcha
      }
    })
  },
  async logout() {
    return client.post('api/v1/account/logout')
  },

  new(config) {
    return axios.create(config)
  },

  mount401Interceptor() {
    this._401interceptor = client.interceptors.response.use(
      function (response) {
        httpEventBus.httpResponse(response)

        return response
      },
      function (error) {
        if (!error.response) {
          let notification_credentials = {
            text: 'network_error',
            color: 'error',
            type: 'error'
          }
          EventBus.$emit('snack-bar-notification', notification_credentials)

          return false
        }

        httpEventBus.httpResponse(error.response)
        const errorResponse = error.response
        if (isTokenExpired(errorResponse)) return resetTokenAndReattemptRequest(error)

        return Promise.reject(error)
      }
    )
  },

  unmount401Interceptor() {
    client.interceptors.response.eject(this._401interceptor)
  }
}

function isTokenExpired(errorResponse) {
  return (errorResponse && errorResponse.request && errorResponse.request.status) === StatusCodes.UNAUTHORIZED
}

let isAlreadyFetchingAccessToken = false

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = []

async function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error
    const refreshToken = TokenUtils.getRefreshToken()
    if (!refreshToken) return Promise.reject(error)

    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token
        resolve(MovieConnector.customRequest(errorResponse.config))
      })
    })
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      const newToken = await store.dispatch('refreshToken')
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

export default MovieConnector
