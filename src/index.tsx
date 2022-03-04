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

axios({
  method: 'get',
  url: baseUrl + '/get',
  params: user
})
  .then((res: AxiosResponse) => {
    console.log(res)
    console.log(res.data)
  })
  .catch(e => {
    console.log(e)
  })
