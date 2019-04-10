import axios from 'axios'
import qs from 'qs'

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    config.transformRequest = [function (data, headers) {
      return qs.stringify(data);
    }];
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

export function get(url, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      headers: {'Content-Type': 'application/json'},
      data: data
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(res => {
        reject(res)
      })
  })
}

export function post(url, data = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
      data: data
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(res => {
        reject(res)
      })
  })
}

