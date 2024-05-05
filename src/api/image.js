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

export function getSocietyImg() {
    return request({
        url: '/society/all',
        method: 'get',
    })
}
export function publishImgToSociety(data) {
    return request({
        url: '/society/add',
        method: 'post',
        data
    })
}

