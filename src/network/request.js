import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        // baseURL: 'http://152.136.185.210:8000/api/w6',
        baseURL: 'http://152.136.185.210:7878/api/m5',
        // baseURL: '/api'
        // const BASE_URL = '/api'
        // timeout: 5000
    })

    //请求拦截器（客户端发送请求->[请求拦截器]->服务器）
   instance.interceptors.request.use(config => {
       return config
   }, err => {
        console.log(err);
   }) 

   //相应拦截器（服务器->[拦截的统一处理]->服务器客户端发送请求）
   instance.interceptors.response.use(res => {
    return res.data
    //拦截器已经将响应主体返回了，请求后收到的数据只有相应主题的内容
    }, err => {
        console.log(err);
    }) 

    return instance(config)
}

// axios.defaults.baseURL = 'http://152.136.185.210:7878/api/m5'
// axios.defaults.baseURL = '/api'

// axios.interceptors.request.use(config => {
//         return config
//     }, err => {
//         console.log(err);
// }) 
    
// //相应拦截器（服务器->[拦截的统一处理]->服务器客户端发送请求）
// axios.interceptors.response.use(res => {
//     return res.data
//     //拦截器已经将响应主体返回了，请求后收到的数据只有相应主题的内容
//     }, err => {
//         console.log(err);
// }) 
        
// export default axios