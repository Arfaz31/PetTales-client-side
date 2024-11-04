import envConfig from "@/config/envConfig";
import { getNewAccessToken } from "@/services/AuthService";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

//Request Interceptor: Adds the authorization token (accessToken) to all outgoing requests if the token exists in cookies.

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response; // If the response is okay, return it as is
  },
  async function (error) {
    const originalRequest = error.config;

    // Check for a 401 error and if the request hasn't been sent already
    if (error?.response?.status === 401 && !originalRequest?.sent) {
      originalRequest.sent = true; // Mark the request as sent to prevent infinite loops

      try {
        // Attempt to get a new access token using the refresh token
        const res = await getNewAccessToken();
        const accessToken = res.data.accessToken;

        // Update the authorization header and set the new access token in cookies
        originalRequest.headers["Authorization"] = accessToken;
        cookies().set("accessToken", accessToken);

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (tokenError) {
        // Handle error while refreshing token
        return Promise.reject(tokenError);
      }
    }

    // If the error is not a 401 or the request has already been sent, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
