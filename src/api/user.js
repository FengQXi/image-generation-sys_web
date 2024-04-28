import request from '@/utils/request'
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function register(){
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

export function getUserInfo(userId){
    return request({
        url: `/user/permission/${userId}`,
        method: 'get',
    })
}