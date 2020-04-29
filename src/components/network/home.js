import {request} from './request'

//验证登录账号信息
export function getmultidata(username,password){
    return request({
        url: '/account',
        method: 'post',
        params: {
            username,
            password
        }
    })
}