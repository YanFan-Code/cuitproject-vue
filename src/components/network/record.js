import {request} from './request'

export function getrecord(employeeId){
    return request({
        url:'/records/'+ employeeId,
        method: 'get',  
    })
}
export function getrecordbydate(employeeId,date){
    return request({
        url:'/records/'+ employeeId+'/'+date,
        method: 'get',  
    })
}

export function addrecord(record){
    if(record.type === '出差'){
        return request({
            url:'/records/outwork',
            method: 'put',  
            data:record
        })
    }else if(record.type === '缺勤'){
        return request({
            url:'/records/attendence',
            method: 'put',  
            data:record
        })
    }else{
        return request({
            url:'/records/achievement',
            method: 'put',  
            data:record
        })
    }
}