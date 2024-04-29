import request from '@/utils/request'
export function addFavoriteImage(data) {
    return request({
        url: '/image/add',
        method: 'post',
        data
    })
}

export function removeFavoriteImage(id) {
    return request({
        url: `/image/delete/${id}`,
        method: 'delete',
    })
}

export function getFavoriteImagesByUserId(userId) {
    return request({
        url: `/image/list/${userId}`,
        method: 'get',
    })
}

