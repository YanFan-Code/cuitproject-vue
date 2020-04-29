import {request} from './request'

export function GetemployeeList(employeeId){
    return request({
        url:'/staff/'+employeeId,
        method: 'get'
    })
}

export function SearchStaff(username){
    return request({
        url:'/staff/like/'+username,
        method:'get'
    })
}

export function PutAskFor(askFor){
    return request({
        url:'/AskFors/1',
        method:'put',
        data:askFor
    })
}