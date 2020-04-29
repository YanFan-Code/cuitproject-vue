import {request} from './request'

export function recMess(){
    return new request({
        url:'/AskFors',
        method:'get'
    })
}