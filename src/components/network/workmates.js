import {request} from './request'

export function getworkmates(employeeId,managerId){
    return request({
        url:'/workmates/'+employeeId+'/'+managerId,
        method:'get'
    })
}

export function searchworkmates(employeeId,managerId,name){
    return request({
        url:'/workmates/'+employeeId+'/'+managerId+'/'+name,
        method:'get'
    })
}