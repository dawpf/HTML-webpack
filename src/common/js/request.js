import axios from 'axios'
import toast from './toast'

function myToast(msg) {
  return new toast(msg)
}

console.log('process.env.NODE_ENV---', process.env.NODE_ENV);

const isProduction = process.env.NODE_ENV === 'production'

const baseURL_dev = '测试环境地址' // 测试环境
const baseURL_pro = '生产环境地址' // 生产环境

/**
 * 每次请求都要传入与app交互获取的token
 */
const request = axios.create({
  baseURL: isProduction ? baseURL_pro : baseURL_dev,
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 6000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {

    // 对请求数据进行处理

    // config.data = config.data || {}
    // 添加 token
    // config.headers['Authorization'] = config.data.token
    //   ? config.data.token
    //   : TEMP_TOKEN

    // config.data.token && delete config.data.token

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('error--------', error);

    // 对不同的状态码进行处理
    // myToast(error.response.data.msg)

    return Promise.reject(error)
  }
)

export default request
