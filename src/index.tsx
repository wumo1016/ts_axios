// import axios, { AxiosResponse } from 'axios'
import axios, { AxiosResponse } from './axios'

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
