import axios from "axios";

// ----- BASE URL -----
const BASE = import.meta.env.VITE_API_BASE_URL || "/";

// ----- 토큰 보관 (메모리 + sessionStorage) -----
let accessToken = null;

export const setAccessToken = (t) => {
  accessToken = t || null;
  if (t) {
    sessionStorage.setItem("atk", t);
  } else {
    sessionStorage.removeItem("atk");
  }
};

export const clearAccessToken = () => {
  accessToken = null;
  sessionStorage.removeItem("atk");
};

// 앱 첫 로드 시 저장된 토큰 복구
(() => {
  const saved = sessionStorage.getItem("atk");
  if (saved) accessToken = saved;
})();

// ----- axios 인스턴스 -----
const api = axios.create({
  baseURL: BASE,
  withCredentials: false,
});

// 요청 인터셉터: Authorization 자동 첨부
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터: 401 → 토큰 파기 & 로그인 이동
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      clearAccessToken();
      if (!window.location.pathname.startsWith("/login")) {
        const from = encodeURIComponent(
          window.location.pathname + window.location.search
        );
        window.location.assign(`/login?from=${from}`);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
