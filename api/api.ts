import axios from "axios";

const api = axios.create({
  baseURL: "https://newsapi.org/v2", // Replace with your base URL
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Optional: Add interceptors for logging, auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    // Add auth token or other headers here
    const token = "your-auth-token"; // Replace with your token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
