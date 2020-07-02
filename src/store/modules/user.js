import {
    getToken,
    setToken,
    removeToken,
    getUsername,
    setRole,
    getRole,
    removeUsername,
    removeRole
} from "../../utils/auth";

import axios from 'axios'
import Vue from 'vue'
import api, {baseURL} from '../../api/user'
//authURL for local server
const authURL = "http://localhost:8086"

//authURL for test server
//  const authURL = "http://bidhana.com:8083"

const state = {
    token: getToken(),
    username: getUsername(),
    logout(state) {
        state.token = ''
    }
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },

    SET_USERNAME: (state, username) => {
        state.username = username
    }
}

const actions = {
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            var params = new URLSearchParams();
            params.append("grant_type", "password");
            params.append("username", username);
            params.append("password", password);

            return axios({
                method: 'post',
                url: `${authURL}/oauth/token`,
                auth: { username: 'studentID', password: 'student68i'},
                data: params
            }).then((response) => {
                if (response.status == 200) {
                    let expires = (response.data.expires_in) / (30 * 48 * 60)
                    // let expires = 1/(30*48)
                    commit('SET_TOKEN', response.data.access_token)
                    commit('SET_USERNAME', username);
                    setToken(response.data.access_token, expires)
                    resolve(response)
                }
            }).catch(() => {
                Vue.notify({
                    group: 'alert-message',
                    type: 'error',
                    title: 'Error',
                    text: 'Invalid Username or Password'
                })
            })
        })
    },

    //use register
    register({commit}, user) {
        console.log(user);
        return new Promise((resolve, reject) => {

            return axios({
                method: 'post',
                url: `${authURL}/api/register`,
                data: user

            }).then((response) => {
                console.log(response)

                resolve(response)
            })
        })
    },

//  user logout
    logout({commit}) {
        return new Promise((resolve, reject) => {
            removeToken()
            removeUsername()
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

