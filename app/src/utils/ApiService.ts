import axios from 'axios'
import { notification } from 'antd'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
    Object.assign(config, {
        data: qs.stringify(config.data)
    })

    return config
})

axios.interceptors.response.use(
    res => {
        const { data } = res

        if (data.code !== 0) {
            notification.error({
                message: '接口异常',
                description: data.message,
            })
        }

        return res
    },
    () => {
        notification.error({
            message: '网络异常，请检查网络连接',
            description: ''
        })
    }
)

export default axios