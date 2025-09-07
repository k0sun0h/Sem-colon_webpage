import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/index.jsx";
import "../css/SignUp.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validatePassword = (pw) => ({
    length: pw.length >= 8,
    number: /\d/.test(pw),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  });
  const pwv = validatePassword(password);

  const onChangeImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSendCode = async () => {
    try {
      if (!email.trim()) {
        setError("이메일을 입력하세요.");
        return;
      }
      setError("");
      setSendingCode(true);

      if (AuthAPI.sendEmailCode) {
        await AuthAPI.sendEmailCode({ email });
      } else {
        await new Promise((res) => setTimeout(res, 700));
      }

      alert("인증번호를 전송했습니다. 메일함을 확인하세요.");
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "인증번호 전송 실패";
      setError(msg);
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (!emailCode.trim()) {
        setError("인증번호를 입력하세요.");
        return;
      }
      setError("");
      setVerifyingCode(true);

      let ok = true;
      if (AuthAPI.verifyEmailCode) {
        ok = await AuthAPI.verifyEmailCode({ email, code: emailCode });
      } else {
        await new Promise((res) => setTimeout(res, 600));
        ok = emailCode.length >= 4;
      }

      if (ok) {
        setEmailVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        setEmailVerified(false);
        setError("인증번호가 올바르지 않습니다.");
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "인증번호 검증 실패";
      setError(msg);
      setEmailVerified(false);
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !major.trim() || !email.trim() || !password.trim()) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!pwv.length || !pwv.number || !pwv.special) {
      setError("비밀번호 형식이 올바르지 않습니다.");
      return;
    }
    if (!emailVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await AuthAPI.register({
        name,
        email,
        userId: email,
        password,
        major,
        profileImage,
      });

      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "회원가입 중 오류가 발생했습니다.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const disabledAll = submitting || sendingCode || verifyingCode;

  return (
    <>
      <div className="login-background" />
      <div className="signup-container">
        <div className="signup-box">
          <h2 className="login-title">회원가입</h2>

          {error && <div className="error-box">{error}</div>}

          <form className="signup-contents" onSubmit={handleSignup}>
            {/* 프로필 사진 */}
            <div className="photo-row">
              <div
                className="photo-preview-wrapper"
                onClick={() => document.getElementById("profileInput").click()}
                role="button"
                aria-label="프로필 사진 업로드"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="미리보기" className="photo-preview" />
                ) : (
                  <span className="photo-placeholder-text">+</span>
                )}
              </div>
              <input
                id="profileInput"
                type="file"
                accept="image/*"
                onChange={onChangeImage}
                className="photo-input-hidden"
                disabled={disabledAll}
              />
              <div className="photo-file-name">
                {profileImage ? profileImage.name : "파일을 선택하세요"}
              </div>
            </div>

            {/* 2열 */}
            <div className="form-grid-2">
              <div className="field">
                <label>이름</label>
                <input
                  type="text"
                  value={name}
                  className="login-input"
                  onChange={(e) => setName(e.target.value)}
                  disabled={disabledAll}
                />
              </div>

              <div className="field">
                <label>학과</label>
                <input
                  type="text"
                  value={major}
                  className="login-input"
                  onChange={(e) => setMajor(e.target.value)}
                  disabled={disabledAll}
                />
              </div>

              {/* 이메일 */}
              <div className="field">
                <label>이메일</label>
                <div className="inline-with-button">
                  <input
                    type="email"
                    value={email}
                    className="login-input"
                    placeholder="이메일 주소"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailVerified(false);
                    }}
                    disabled={disabledAll}
                  />
                  <button
                    type="button"
                    className="sub-button"
                    onClick={handleSendCode}
                    disabled={sendingCode || !email.trim() || submitting}
                  >
                    {sendingCode ? "전송 중..." : "코드 전송"}
                  </button>
                </div>
              </div>

              {/* 인증번호 */}
              <div className="field">
                <label>인증번호</label>
                <div className="inline-with-button">
                  <input
                    type="text"
                    value={emailCode}
                    className="login-input code-input"
                    placeholder="인증번호"
                    inputMode="numeric"
                    onChange={(e) => setEmailCode(e.target.value)}
                    disabled={submitting || verifyingCode}
                  />
                  <button
                    type="button"
                    className={`sub-button ${emailVerified ? "verified" : ""}`}
                    onClick={handleVerifyCode}
                    disabled={verifyingCode || !emailCode.trim() || submitting}
                  >
                    {emailVerified ? "인증 완료" : verifyingCode ? "인증 중..." : "인증"}
                  </button>
                </div>
              </div>

              <div className="field">
                <label>비밀번호</label>
                <input
                  type="password"
                  value={password}
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disabledAll}
                />
                <div className="password-checks">
                  <p className={pwv.length ? "pass" : ""}>8자 이상</p>
                  <p className={pwv.number ? "pass" : ""}>숫자 포함</p>
                  <p className={pwv.special ? "pass" : ""}>특수문자 포함</p>
                </div>
              </div>

              <div className="field">
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordConfirm}
                  className="login-input"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  disabled={disabledAll}
                />
              </div>
            </div>

            <div className="actions">
              <button type="submit" className="signup-button" disabled={submitting}>
                {submitting ? "처리 중..." : "회원가입"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
