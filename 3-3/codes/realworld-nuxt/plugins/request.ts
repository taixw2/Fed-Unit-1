import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://conduit.productionready.io/',
})

export default ({ store }: any) => {
  axiosInstance.interceptors.request.use((config) => {
    const userModule = store.state.user

    if (userModule.user && userModule.user.token) {
      config.headers.Authorization = 'Token ' + userModule.user.token
    }

    return config
  })
}

export { axiosInstance as request }
