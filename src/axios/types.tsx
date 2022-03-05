export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'

export interface AxiosRequestConfig {
  url: string
  method: Method
  params: Record<string, any>
}

// Axios.prototype.request
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<T>
}

export interface AxiosResponse<T = any> {
  data: T // 响应体的类型
  status: number
  statusText: string
  request?: XMLHttpRequest
  headers?: Record<string, any>
  config?: Record<string, any>
}
