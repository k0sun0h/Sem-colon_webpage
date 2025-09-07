import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth.jsx";
import "../css/Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await login(userId.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "로그인에 실패했습니다.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="login-background" />
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2 className="login-title">로그인</h2>

          {error && (
            <div
              style={{
                background: "rgba(255,0,0,0.15)",
                border: "1px solid #ff6b6b",
                color: "white",
                padding: "10px 12px",
                borderRadius: 6,
                marginBottom: 16,
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <div className="login-inputs">
            <label>아이디</label>
            <input
              value={userId}
              className="login-input"
              onChange={(e) => setUserId(e.target.value)}
              disabled={submitting}
            />

            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          <button className="login-button" type="submit" disabled={submitting}>
            {submitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </>
  );
}
