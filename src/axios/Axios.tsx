import { AxiosRequestConfig, AxiosResponse, Interceptor } from './types'
import qs from 'qs'
import parseHeader from 'parse-headers'
import InterceptorManager from './AxiosInterceptorManager'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      accept: 'application/json'
    }
  }
}
const getStyleMethods = ['get', 'head', 'delete', 'options']
getStyleMethods.forEach(key => {
  defaults.headers![key] = {}
})
const postStyleMethods = ['put', 'post', 'patch']
postStyleMethods.forEach(key => {
  defaults.headers![key] = {
    'content-type': 'application/json' // 请求体的格式
  }
})

class Axios {
  public defaults: AxiosRequestConfig = defaults
  public interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>()
  }

  // T用来定义响应中的data类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // 合并配置
    Object.assign(this.defaults.headers, config.headers || {})
    // 拦截器
    const chain: Interceptor<AxiosRequestConfig | AxiosResponse>[] = [
      {
        onFulfilled: this.dispatchRequest.bind(this)
      }
    ]
    this.interceptors.request.interceptors!.forEach(interceptor => {
      interceptor && chain.unshift(interceptor)
    })
    this.interceptors.response.interceptors!.forEach(interceptor => {
      interceptor && chain.push(interceptor)
    })
    let promise: Promise<AxiosRequestConfig | AxiosResponse<T>> =
      Promise.resolve(config)
    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!
      promise = promise.then(onFulfilled, onRejected)
    }
    return promise as any
  }
  // 派发请求
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      const request = new XMLHttpRequest()
      let { method, url, params, data, timeout } = config
      if (!url) url = ''
      // url中可能包含params参数 所以需要处理
      if (params) {
        params = qs.stringify(params) as any // { name: 'wyb', age: '18' } => name=wyb&age=18
        url += (url.includes('?') ? '&' : '?') + params
      }
      request.open(method || 'get', url, true)
      // request.responseType = 'json'
      request.onreadystatechange = function () {
        const { readyState, status } = request
        // 1 2 3 4(完成)
        if (readyState === 4 && status !== 0) {
          if (status >= 200 && status < 300) {
            const { response, responseText, status, statusText } = request
            const res: AxiosResponse<T> = {
              data: response ? JSON.parse(response) : responseText,
              status,
              statusText,
              headers: parseHeader(request.getAllResponseHeaders()), // getAllResponseHeaders() => content-type=xx;content-length=xxx 所以需要转化成对象
              config,
              request
            }
            resolve(res)
          } else {
            reject(`Error: Request failed width status code ${status}`)
          }
        }
      }
      // 处理请求头
      // if (headers) {
      //   for (const key in headers) {
      //     request.setRequestHeader(key, headers[key])
      //   }
      // }
      const headers = this.defaults.headers
      for (const key in headers) {
        if (key === 'common' || key === method) {
          const obj = headers[key]
          for (const k in obj) {
            request.setRequestHeader(k, obj[k])
          }
        }
      }

      // 处理请求体
      let body: string | null = null
      if (data) {
        body = JSON.stringify(data)
      }
      request.onerror = function (e) {
        reject('Error: Network Error')
      }
      // 处理超时
      if (timeout) {
        request.timeout = timeout
        request.ontimeout = function () {
          reject(`Error: timeout of ${timeout}ms exceeded`)
        }
      }
      request.send(body)
    })
  }
}

export default Axios
