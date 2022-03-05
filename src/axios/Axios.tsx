import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs'
import parseHeader from 'parse-headers'

class Axios {
  // T用来定义响应中的data类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest<T>(config)
  }
  // 派发请求
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      const request = new XMLHttpRequest()
      let { method, url, params, data, headers, timeout } = config
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
      if (headers) {
        for (const key in headers) {
          request.setRequestHeader(key, headers[key])
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
