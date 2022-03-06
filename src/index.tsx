// import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosRequestConfig, AxiosResponse } from './axios'

const baseUrl = 'http://localhost:8080'
interface User {
  name: string
  age: string
}

const user: User = {
  name: 'wyb',
  age: '18'
}

/* ----------------- get ----------------- */
// axios({
//   method: 'get',
//   url: baseUrl + '/get',
//   params: user
// })
//   .then((res: AxiosResponse<User>) => {
//     console.log(res)
//     console.log(res.data)
//   })
//   .catch(e => {
//     console.log(e)
//   })

/* ----------------- post ----------------- */
// axios({
//   method: 'post',
//   url: baseUrl + '/post',
//   headers: {
//     'content-type': 'application/json'
//   },
//   data: user
// })
//   .then((res: AxiosResponse<User>) => {
//     console.log(res)
//     console.log(res.data)
//   })
//   .catch(e => {
//     console.log(e)
//   })

/* ----------------- 测试网络错误 ----------------- */
// setTimeout(() => {
//   axios({
//     method: 'post',
//     url: baseUrl + '/post',
//     headers: {
//       'content-type': 'application/json'
//     },
//     data: user
//   })
//     .then((res: AxiosResponse<User>) => {
//       console.log(res)
//       console.log(res.data)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// }, 3000)

/* ----------------- 测试网络超时 ----------------- */
// axios({
//   method: 'post',
//   url: baseUrl + '/post_timeout?timeout=3000',
//   headers: {
//     'content-type': 'application/json'
//   },
//   timeout: 2000,
//   data: user
// })
//   .then((res: AxiosResponse<User>) => {
//     console.log(res)
//     console.log(res.data)
//   })
//   .catch(e => {
//     console.log(e)
//   })

/* ----------------- 测试状态码错误 ----------------- */
// axios({
//   method: 'post',
//   url: baseUrl + '/post_status?code=400',
//   headers: {
//     'content-type': 'application/json'
//   },
//   data: user
// })
//   .then((res: AxiosResponse<User>) => {
//     console.log(res)
//     console.log(res.data)
//   })
//   .catch(e => {
//     console.log(e)
//   })

/* ----------------- 测试拦截器 ----------------- */

// const request1 = axios.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     config.headers!.name += '1'
//     return config
//   }
// )
// axios.interceptors.request.use((config: AxiosRequestConfig) => {
//   config.headers!.name += '2'
//   return config
// })
// axios.interceptors.request.use((config: AxiosRequestConfig) => {
//   config.headers!.name += '3'
//   // return config
//   return new Promise((r, j) => {
//     setTimeout(() => {
//       r(config)
//     }, 2000)
//   })
// })
// axios.interceptors.request.eject(request1)

// const resonse1 = axios.interceptors.response.use((resonse: AxiosResponse) => {
//   resonse.data.name += '1'
//   return resonse
// })
// axios.interceptors.response.use((resonse: AxiosResponse) => {
//   resonse.data.name += '2'
//   return resonse
// })
// axios.interceptors.response.use((resonse: AxiosResponse) => {
//   resonse.data.name += '3'
//   return resonse
// })
// axios.interceptors.response.eject(resonse1)

// axios({
//   method: 'post',
//   url: baseUrl + '/post',
//   headers: {
//     'content-type': 'application/json',
//     name: 'wyb'
//   },
//   data: user
// })
//   .then((res: AxiosResponse<User>) => {
//     console.log(res)
//     console.log(res.data)
//   })
//   .catch(e => {
//     console.log(e)
//   })

/* ----------------- 测试合并默认配置 ----------------- */

// axios({
//   method: 'get',
//   url: baseUrl + '/get',
//   params: user
// })
//   .then((res: AxiosResponse<User>) => {
//     console.log(res)
//     console.log(res.data)
//   })
//   .catch(e => {
//     console.log(e)
//   })

axios({
  method: 'post',
  url: baseUrl + '/post',
  headers: {},
  data: user
})
  .then((res: AxiosResponse<User>) => {
    console.log(res)
    console.log(res.data)
  })
  .catch(e => {
    console.log(e)
  })
