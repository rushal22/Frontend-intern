import axios from "axios";
import { config } from "../helper/config";
import { logoutUser } from "../helper/helper";
// console.log("@data", config)

function saveToken(token) {
  localStorage.setItem("Bearer", token);
}
async function handleTokenRefresh() {
  try {
    const accessToken = localStorage.getItem("Bearer");
    const response = await axios.post(
      `${config.baseUrl}/api/refresh`, null,
      {
        headers: {
          "Authorization":`Bearer ${accessToken}` ,
        },
      }
    );
    const { access_token } = response.data;
    saveToken(access_token);
    return access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return Promise.reject(error);
  }
}

function createApiClient() {
  const apiClient = axios.create({
    baseURL: `${config.baseUrl}/api/`,
    timeout: 5000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem("Bearer")
      if(accessToken){
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
     return config;
   },
   (error) => {
     Promise.reject(error)
   }
 );

apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async(error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const accessToken = await handleTokenRefresh();
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiClient(originalRequest)
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  return apiClient;
} 



async function baseApi({ apiDetails, path = {}, query = {}, body = {}, headers = {}, requireAuth = true}) {
  try {
    const updatedApiDetails = { ...apiDetails };
    Object.entries(path).forEach((data) => {
      updatedApiDetails.url = updatedApiDetails.url.replace(`:${data[0]}`, data[1]);
    });

    const client = createApiClient();
    if (!requireAuth) {
      delete headers["Authorization"];
    }

    const response = await client({
      url: updatedApiDetails.url,
      method: updatedApiDetails.method,
      data: body,
      params: query,
      headers: { ...headers },
    });

    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      if (error.message === "Access token not available") {
        logoutUser(); 
      }
    }
    throw error;
  }
}


export default baseApi;
