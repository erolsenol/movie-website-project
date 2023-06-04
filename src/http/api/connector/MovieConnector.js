import axios from 'axios'
import { TokenUtils } from '../../../utils/token.utils'
import { StatusCodes } from 'http-status-codes'
import Qs from 'qs'

const paramsSerializer = params => Qs.stringify(params, { indices: false, arrayFormat: 'repeat' })
const TIMEOUT = 3600000
const AUTHORIZATION_HEADER_KEY = 'Authorization'

export default class MovieConnector {
  constructor(BASE_URL) {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      paramsSerializer: paramsSerializer
    })
    this._401interceptor = null
    this.isAlreadyFetchingAccessToken = false
    this.subscribers = []
  }
  _401interceptor = null

  init(baseUrl) {
    this.client = axios.create({ baseURL: baseUrl, timeout: 60000, paramsSerializer: paramsSerializer })
  }
  setHeader(fieldName, fieldValue) {
    this.client.defaults.headers.common[fieldName] = fieldValue
  }
  setAccessTokenToHeader() {
    this.setHeader('Authorization', `Bearer ${TokenUtils.getToken()}`)
  }
  setRefreshTokenToHeader() {
    this.setHeader('refresh-token', TokenUtils.getRefreshToken())
  }
  removeHeader() {
    this.client.defaults.headers.common = {}
  }
  getClient() {
    return this
  }
  getClient2() {
    return this.client
  }
  get(resource, config = {}) {
    console.log('resource', resource)
    console.log('config', config)
    console.log('this.client', this.client.get)

    return this.client.get(resource)
  }
  post(resource, data, config = {}) {
    return this.client.post(resource, data, config)
  }
  put(resource, data, config = {}) {
    return this.client.put(resource, data, config)
  }

  delete(resource, config = {}) {
    return this.client.delete(resource, config)
  }
  async customRequest(config) {
    return this.client(config)
  }
  async login(data) {
    return this.client.post('login', null, {
      params: {
        username: data.email,
        password: data.password
      },
      headers: {
        captcha: data.captcha
      }
    })
  }
  async logout() {
    return this.client.post('api/v1/account/logout')
  }

  new(config) {
    return axios.create(config)
  }

  mount401Interceptor() {
    this._401interceptor = this.client.interceptors.response.use(
      function (response) {
        // httpEventBus.httpResponse(response)

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

        // httpEventBus.httpResponse(error.response)
        const errorResponse = error.response
        if (isTokenExpired(errorResponse)) return resetTokenAndReattemptRequest(error)

        return Promise.reject(error)
      }
    )
  }

  unmount401Interceptor() {
    this.client.interceptors.response.eject(this._401interceptor)
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
