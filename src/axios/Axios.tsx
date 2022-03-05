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
      let { method, url, params } = config
      // url中可能包含params参数 所以需要处理
      if (params && typeof params === 'object') {
        params = qs.stringify(params) as any // { name: 'wyb', age: '18' } => name=wyb&age=18
        url += (url.includes('?') ? '&' : '?') + params
      }
      request.open(method, url, true)
      // request.responseType = 'json'
      request.onreadystatechange = function () {
        // 1 2 3 4(完成)
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status < 300) {
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
            reject('请求失败')
          }
        }
      }
      request.send()
    })
  }
}

export default Axios
