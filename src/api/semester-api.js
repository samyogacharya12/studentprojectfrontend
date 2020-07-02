import request from '../utils/request'

export default {

    findAll(listQuery)
    {
        return request({
        url:'/api/semester',
        method:'get',
        params:listQuery
        })
    },
    findById(id)
    {
        return request({
            url:'/api/semester/'+id,
            method:'get'
        })
    },
    getAll()
    {
        return request({
            url:'/api/semester/findall',
            method:'get'
        })
    },
    save(semesterDto){
        return request({
            url:'api/semester',
            method:'post',
            data:semesterDto
        })

    }

}