import axios from 'axios'
import {
  Message
} from 'element-ui'
import localStore from './localstorage.js'
import GlobalConstants from './constants.js'

// const BASEURL = process.env.NODE_ENV === 'production' ? 'http://log.mxnzp.com/admin_api/' : process.env.VUE_APP_API;
const BASEURL = process.env.NODE_ENV === 'production' ? 'http://tools.cretinzp.com/translate_api/' : process.env.VUE_APP_API;
const service = axios.create({
  baseURL: BASEURL,
  timeout: 15000,
  headers: {
    'Content-Type': "application/json",
  }
  // 网络请求接口，假设 5000
  // 1000 2000，
});

//创建axios 赋值给变量
// Add a request interceptor
service.interceptors.request.use(function (config) {
  // Do something before request is sent

  //给请求头中设置token
  let token = localStore.getStorage(GlobalConstants.LOCAL_KEY_TOKEN)
  config.headers.token = token

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
service.interceptors.response.use(function (response) {
  // Do something with response data
  let code = response.data.code
  if (code !== 200 && code !== 1) {
    Message.error(response.data.msg)

    if (code === 201) {
      localStore.removeStorage(GlobalConstants.LOCAL_KEY_NICKNAME)
      localStore.removeStorage(GlobalConstants.LOCAL_KEY_TOKEN)
      setTimeout(function(){
        window.location = process.env.NODE_ENV === 'production'?"/pro_admin_codemao":"/"
      },1000)
    }

    return Promise.reject(response.data)
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default service;
