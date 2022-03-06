import {
  AxiosInterceptorManager,
  Interceptor,
  OnFulfilled,
  OnRejected
} from './types'

export default class InterceptorManager<T>
  implements AxiosInterceptorManager<T>
{
  interceptors: (Interceptor<T> | null)[] = []

  use(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected) {
    this.interceptors.push({
      onFulfilled,
      onRejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if (this.interceptors[id]) this.interceptors[id] = null
  }
}
