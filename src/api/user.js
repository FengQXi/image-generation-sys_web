import request from '@/utils/request'
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function register(data){
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

export function getUserInfo(userId){
    return request({
        url: `/user/permissions/${userId}`,
        method: 'get',
    })
}

export function getCountInfo(userId){
    return request({
        url: `/user/count/${userId}`,
        method: 'get',
    })
}