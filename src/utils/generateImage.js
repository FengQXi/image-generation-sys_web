import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: "dev-qf-api", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 45000, // request timeout
})

const SAVE_TIME = 3 * 24 * 60 * 60 * 1000
const YOUR_API_KEY = "LjX9iQz2E3O1D1iuB6MDNmHD"
const YOUR_SECRET_KEY = "LOAzIpCK5HUue6LdzEBMD8bIES5hfDzx"

/**
 * 保存大模型令牌
 * @param {*} token 
 */
function setAccessToken(token) {
    const expireTime = new Date(new Date().getTime() + SAVE_TIME).getTime();
    localStorage.setItem("accessToken", token);
    localStorage.setItem("expireTime", expireTime);
}

/**
 * 获取大模型令牌
 * @returns token
 */
async function getAccessToken() {
    let token = null
    // 如果没过期就获取localStorage中的token
    if (new Date().getTime() < localStorage.getItem("expireTime")) {
        token = localStorage.getItem("accessToken");
    } else {
        // 如果过期就重新获取token
        try {
            token = await requestAccessToken()
        } catch (error) {
            console.log(error)
        }
    }
    return token
}

/**
 * 发请求拿大模型令牌
 * @returns 
 */
async function requestAccessToken() {
    // 获取token
    const res = await service({
        url: "/oauth/2.0/token",
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            grant_type: "client_credentials",
            client_id: YOUR_API_KEY,
            client_secret: YOUR_SECRET_KEY
        },
    })

    let token = null

    if(res.data.refresh_token) {
        token = res.data.refresh_token
        setAccessToken(token)
    }

    return token
}

function generateImage(prompt) {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken()
        if(!token) {
            reject("获取token失败")
        }
        const res = await service({
            url: "/rpc/2.0/ai_custom/v1/wenxinworkshop/text2image/sd_xl",
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                access_token: token
            },
            data: {
                ...prompt
            }
        })

        resolve(res.data)
    })
}

export default generateImage