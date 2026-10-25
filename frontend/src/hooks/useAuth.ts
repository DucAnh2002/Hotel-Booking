import { useAuth0 } from '@auth0/auth0-react'
import { useMemo } from 'react'
import { createApiClient } from '../api/axiosClient'

export const useAuthApi = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getApiToken = async () => {
    return await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH_AUDIENCE || 'https://hotel-api',
        scope: 'openid profile email'
      }
    })
  }
  const apiClient = useMemo(() => {
    return createApiClient(getApiToken)
  }, [getAccessTokenSilently])

  return { apiClient, getApiToken }
}
