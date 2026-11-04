import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiClient } from "../api/axiosClient";

const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

export function useAuthApi() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const interceptorId = apiClient.interceptors.request.use(async (config) => {
      if (!AUTH0_AUDIENCE) {
        throw new Error("Thiếu VITE_AUTH0_AUDIENCE trong file .env");
      }

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: AUTH0_AUDIENCE,
          scope: "openid profile email",
        },
      });

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(interceptorId);
    };
  }, [getAccessTokenSilently]);

  return apiClient;
}
