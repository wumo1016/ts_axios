import Axios from './Axios'

function createInstance() {
  const context: Axios = new Axios()
  // 让 request 方法里的 this 永远指向 context
  const instance = Axios.prototype.request.bind(context)
  // 将 Axios.prototype 和 context 上的所有属性拷贝到 instance 上
  Object.assign(instance, Axios.prototype, context)
  return instance
}

const axios = createInstance()
export default axios
export * from './types'
