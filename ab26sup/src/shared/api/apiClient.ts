import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// IP được tự động detect bởi script start-dev.js
// Chạy: npm run dev (thay vì expo start)
const API_PORT = 5000;
const DEFAULT_HOST = "192.168.1.30";
const API_HOST = process.env.EXPO_PUBLIC_API_HOST || DEFAULT_HOST;

// Ưu tiên dùng biến URL đầy đủ (cho Render), nếu không thì ghép IP (cho Local)
const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${API_HOST}:${API_PORT}/api`;

console.log("🌐 API URL:", API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token vào header nếu có
apiClient.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
