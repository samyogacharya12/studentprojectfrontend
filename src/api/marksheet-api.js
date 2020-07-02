import request from '../utils/request'

export default {


    findAll(listQuery)
    {
        return request({
            url:'/api/marksheet',
            method:'get',
            params:listQuery
        })
    },

    save(marksheetDto)
    {
        return request({
            url:'/api/marksheet',
            method:'post',
            data:marksheetDto
        })
    },
    findById(id)
    {
        return request({
            url:'/api/marksheet/'+id,
            method:'get'
        })
    }


}