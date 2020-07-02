import axios from 'axios'

// baseURL for localhost
export const baseURL = 'http://localhost:8086'

// baseURL for test server
//  export const baseURL = 'http://bidhana.com:8083'
import request from '../utils/request'

export default {
    verify(userDto) {
        return axios.get(`${baseURL}/api/verify`, {
            params: userDto
        });
    },
    resetPw(phone) {
        return axios.get(`${baseURL}/api/forgetpassword?mobileNumber=` + phone);
    },
    saveUser(userDto)
    {
      return request({
          url:'/api/users',
          method:'post',
          data:userDto
      })
    },

    findUserByUsername(username) {
        return request({
            url: '/api/user?username='+ username,
            method: 'get'
        })
        // return axios.get(`${noauthUrl}/api/user?username=`+username);
    },

    getAllUsers(listQuery) {
        return request({
            url: '/api/findallusers',
            params:listQuery,
            method: 'get'
        })
    },
}
