import {request} from './request'

export function getdatatable(employeeId){
    return request({
        url:'/employees/datatableformonth/'+employeeId,
        method:'get',
    })
}