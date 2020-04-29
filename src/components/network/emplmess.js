import {request} from './request'

export function getEmplMess(username){
    return request({
        url:'/employees/'+username,
        method: 'get'
    })
} 

export function editMess(username,employees){
    console.log(employees)
    return request({
        url:'/employees/'+username,
        method: 'post',
        data:employees
    })
}