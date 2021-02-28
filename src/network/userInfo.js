import axios from 'axios'

axios.defaults.baseURL = '/userInfo'

export function getUserInfo() {
    return axios.get()
}

//请求拦截器（客户端发送请求->[请求拦截器]->服务器）
axios.interceptors.request.use(config => {
    return config
}, err => {
     console.log(err);
}) 

//响应拦截器
axios.interceptors.response.use(res => {
    return res.data
}, err => {
    console.log(err);
})