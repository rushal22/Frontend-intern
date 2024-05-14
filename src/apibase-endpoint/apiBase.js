import axios from "axios";
import {jwtDecode} from "jwt-decode";

// Function to decode JWT and get expiration
function getTokenExpiration(token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken && decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

// Function to save token
function saveToken(token) {
  localStorage.setItem("Bearer", token);
}

// Check if token is expired
function isTokenExpired(token) {
  const expiry = getTokenExpiration(token);
  return expiry ? new Date() > expiry : true;
}

async function handleTokenRefresh() {
  try {
    const accessToken = localStorage.getItem("Bearer");
    if (!accessToken) {
      logoutUser();
      return Promise.reject(new Error("Access token not available"));
    }
    const response = await axios.post(
      "http://127.0.0.1:8000/api/refresh",
      null,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );
    const { access_token } = response.data;
    saveToken(access_token);
    return access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    logoutUser();
    return Promise.reject(error);
  }
}

function createApiClient() {
  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 5000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.request.use(
    async (config) => {
      let accessToken = localStorage.getItem("Bearer");
      if (accessToken && isTokenExpired(accessToken)) {
        try {
          accessToken = await handleTokenRefresh();
        } catch (error) {
          throw error;
        }
      }
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => {
      const { access_token } = response.data;
      if (access_token) {
        saveToken(access_token);
      }
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const accessToken = await handleTokenRefresh();
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
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

function logoutUser() {
  console.log("User Logout");
  localStorage.removeItem("Bearer");
  window.location.href = '/login';
}

function baseApi({ apiDetails, path = {}, query = {}, body = {}, headers = {} }) {
  try {
    Object.entries(path).forEach(([key, value]) => {
      apiDetails.url = apiDetails.url.replace(`:${key}`, value);
    });

    const client = createApiClient();
    const response = client({
      url: apiDetails.url,
      method: apiDetails.method,
      data: body,
      params: query,
      headers: { ...headers },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export default baseApi;
