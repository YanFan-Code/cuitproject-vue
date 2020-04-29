import {request} from './request'

export function getMess(employeeId){
    return request({
        url:'/AskFors/'+employeeId,
        method:'get'
    })
}