import {request} from './request'

export function getdatatableforyear(employeeId){
    return request({
        url:'/employees/datatableforyear/'+employeeId,
        method:'get',
    })
}