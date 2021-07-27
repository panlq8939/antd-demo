import axios from 'axios'
import {message} from 'antd'
import qs from 'qs'

const isDev = process.env.NODE_ENV

const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/258429' : ''
})

// 请求拦截器
service.interceptors.request.use( config => {
  // 配置token
  config.data = Object.assign({},config.data,{
    // authToken: window.localStorage.getItem('authToken')
  })
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
})

// 响应拦截器
service.interceptors.response.use( resp => {
  if(resp.data.code == 200){
    return resp.data.data
  }else{
    // 全局错误处理
    message.error('请求错误')
  }
})

// export const getArticals = () => {
//   return new Promise((resolve, reject)=>{
//     service.post('/api/v1/articleList').then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }

export const getArticals = (offset=0, limited=10) => {
  return service.post('/api/v1/articleList',{
    offset,
    limited
  })
}