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
  url?: string
  method?: Method
  headers?: Record<string, any>
  params?: Record<string, any>
  data?: Record<string, any>
  timeout?: number
}

// Axios.prototype.request
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
}

export type OnFulfilled<T> = (value: T) => T | Promise<T>
export type OnRejected = (error: any) => any
export type Interceptor<T> = {
  onFulfilled?: OnFulfilled<T>
  onRejected?: OnRejected
}

export interface AxiosInterceptorManager<T> {
  use(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected): number
  eject(id: number): void
}

export interface AxiosResponse<T = any> {
  data: T // 响应体的类型
  status: number
  statusText: string
  request?: XMLHttpRequest
  headers?: Record<string, any>
  config?: Record<string, any>
}
