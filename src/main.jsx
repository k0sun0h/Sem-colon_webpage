import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider.jsx";

// 개발에서만 모킹 사용: .env.development 에서 토글
if (import.meta.env.VITE_USE_MOCK === '1') {
  const { worker } = await import('./mocks/browser'); // Vite는 top-level await OK
  await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);