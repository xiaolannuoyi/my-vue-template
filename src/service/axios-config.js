import axios from "axios";
import { Message, MessageBox } from "element-ui";
/****** 创建axios实例 ******/
const service = axios.create({
  // baseURL: process.env.BASE_URL, // api的base_url
  timeout: 5000 // 请求超时时间
});
// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    console.log("添加请求拦截器", config);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    const res = response.data;
    console.log("添加响应拦截器", response);
    if (res.code !== 200) {
      Message({
        type: "error",
        message: res.message,
        duration: 5 * 1000
      });
    } else {
      return response.data;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
