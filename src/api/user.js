import request from '@/utils/request'
export function login(data) {
    return request({
        url: '/system/login',
        method: 'post',
        data
    })
}