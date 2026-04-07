import axios from "axios";
import useAuthStore from "../store/useAuthStore";

// THAY ĐỔI ĐỊA CHỈ IP NẾU CHẠY TRÊN THIẾT BỊ THẬT
// Cách tìm IP máy tính: Mở CMD -> gõ 'ipconfig' -> Tìm dòng 'IPv4 Address'
// Ví dụ: const API_URL = 'http://192.168.1.15:5000/api';
// const API_URL = 'http://10.0.2.2:5000/api'; // Giữ 10.0.2.2 cho Emulator, hãy đổi sang IP máy bạn khi chạy phone thật
const API_URL = "http://192.168.1.128:5000/api";
const apiClient = axios.create({
  baseURL: API_URL,
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
