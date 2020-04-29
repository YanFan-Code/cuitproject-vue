import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL: 'http://112.126.84.237:8081',
        timeout: 5000,
        headers:{'Content-Type':'application/json'}
    })
    instance.interceptors.request.use(config =>{
        return config
    },err =>{
        window.console.log("发送失败")  
    }),
    instance.interceptors.response.use(res =>{
        return res.data
    },err =>{
        window.console.log(err)
    })

    return instance(config)
}