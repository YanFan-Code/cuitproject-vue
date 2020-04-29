import {request} from './request'

export function getAllemployees(){
    return new request({
        url: '/employees',
        method: 'get',
    })
}