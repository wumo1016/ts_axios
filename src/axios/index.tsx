import Axios from './Axios'
import { AxiosInstance } from './types'

function createInstance(): AxiosInstance {
  const context: Axios = new Axios()
  // 让 request 方法里的 this 永远指向 context
  const instance: AxiosInstance = Axios.prototype.request.bind(context) // const instance: AxiosInstance = context.request.bind(context)
  // 将 Axios.prototype 和 context 上的所有属性拷贝到 instance 上
  Object.assign(instance, Axios.prototype, context)

  return instance
}

const axios = createInstance()
export default axios
export * from './types'
