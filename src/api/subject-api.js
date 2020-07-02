import request from '../utils/request'

export default {

    findAll(listQuery)
    {
        return request({
            url:'/api/subject',
            method:'get',
            params:listQuery
        })
    },

    getAll()
    {
        return request({
            url:'/api/subject/getall',
            method:'get'
        })
    },
    save(subjectDto)
    {
        return request({
            url:'/api/subject',
            method:'post',
            data:subjectDto
        })
    },
    findById(id)
    {
        return request({
            url:'/api/subject/'+id,
            method:'get'
        })
    },


}