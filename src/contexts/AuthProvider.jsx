import { useState } from "react";
import { AuthAPI } from "../api/index.jsx";
import { setAccessToken, clearAccessToken } from "../api/client.jsx";
import { AuthCtx } from "./useAuth.jsx";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /** 로그인: 서버에서 받은 user 전체를 그대로 반영 */
  const login = async (userId, password) => {
    const data = await AuthAPI.login({ userId, password });

    // 액세스 토큰 필수
    if (!data?.accessToken) {
      throw new Error(data?.message || "로그인에 실패했습니다.");
    }
    setAccessToken(data.accessToken);

    // 서버가 user를 함께 내려주면 그대로 사용,
    // 없으면 최소 정보로 폴백(이메일/아이디 기준)
    const nextUser =
      data?.user ?? {
        userId,
        email: data?.email || userId,
        name: data?.name || "",
        major: data?.major || "",
        profileImage: data?.profileImage || "",
      };

    setUser(nextUser);
    return nextUser;
  };

  /** 로그아웃 */
  const logout = () => {
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
}
