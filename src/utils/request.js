import axios from 'axios'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/stores/modules/user'

// create an axios instance
const service = axios.create({
    baseURL: "/dev-api", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        const user = useUserStore()

        if (user.token) {
            config.headers['Authorization'] = "Bearer " + getToken()
        }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200) {

            // Token expired;
            if (res.code === 401) {
                const user = useUserStore()
                user.restAuthorization()
                location.reload()
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        console.log('out');
        return Promise.reject(error)
    }
)

export default service
