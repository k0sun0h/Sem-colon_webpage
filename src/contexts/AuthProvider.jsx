import { useState } from "react";
import { AuthAPI } from "../api/index.jsx";
import { setAccessToken, clearAccessToken } from "../api/client.jsx";
import { AuthCtx } from "./useAuth.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (userId, password) => {
    const data = await AuthAPI.login({ userId, password });
    setAccessToken(data.accessToken);
    setUser({ userId, email: data.email, name: data.name });
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
