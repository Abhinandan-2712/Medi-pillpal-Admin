// // src/lib/axiosClient.js
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
// });
// console.log("api",api)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.data?.statusCode === 401 ||error.response?.data?.statusCode === 400 ) {
//       toast.error("Session expired. Please log in again.");
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
// src/lib/axiosClient.js
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 🔹 Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Check if API returned an error inside a 200 response
    if (
      // response.data?.statusCode === 400 ||
      response.data?.statusCode === 401
    ) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(response.data); // reject manually
    }
    return response;
  },
  (error) => {
    // Handle actual HTTP errors (4xx/5xx)
    if (
      // error.response?.data?.statusCode === 401 ||
      error.response?.data?.statusCode === 400
    ) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
