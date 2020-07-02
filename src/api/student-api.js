import request from '../utils/request'

export default {

    findAll(listQuery)
    {
        return request({
            url:'/api/studentdetail',
            method:'get',
            params:listQuery
        })
    },
    findById(id)
    {
        return request({
            url:'/api/studentdetail/'+id,
            method:'get'
        })
    },

    getAll()
    {
        return request({
            url:'/api/studentdetail/findall',
            method:'get',
        })
    },
    save(studentDetailDto)
    {
        return request({
            url:'/api/studentdetail',
            method:'post',
            data: studentDetailDto
        })
    }
}