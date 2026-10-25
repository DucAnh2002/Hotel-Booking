import axios from 'axios'

export const createApiClient = (getAccessToken: () => Promise<string>) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(async config => {
    const token = await getAccessToken()

    if (!token) {
      throw new Error('Không lấy được access token trước khi gọi API')
    }
    config.headers.set('Authorization', `Bearer ${token}`)

    return config
  })
  return api
}
