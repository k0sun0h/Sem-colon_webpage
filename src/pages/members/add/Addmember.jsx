// src/pages/members/add/Addmember.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MembersAPI } from "../../../api/index.jsx";
import "../../../css/Members.css";
import "../../../css/AddMember.css";

export default function AddMember() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const category = state?.category || "현재 부원";

  const [name, setName] = useState("");
  const [part, setPart] = useState("");          // devPart (Enum 값에 맞게 입력)
  const [intro, setIntro] = useState("");        // introduction
  const [portfolio, setPortfolio] = useState("");
  const [contact, setContact] = useState("");    // phoneNumber
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 파일 선택 시 미리보기
  const onChangePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  // 등록 버튼
  const onSubmit = async () => {
    if (!name.trim() || !part.trim() || !intro.trim() || !portfolio.trim() || !contact.trim() || !photo) {
      alert("빈칸을 모두 채워주세요");
      return;
    }

    // 연락처 숫자만 추출 → Int 변환
    const phoneNumber = Number(contact.replace(/[^0-9]/g, ""));
    if (Number.isNaN(phoneNumber)) {
      alert("연락처 형식이 올바르지 않습니다.");
      return;
    }

    try {
      await MembersAPI.create({
        name,
        imageFile: photo,          // File
        introduction: intro,       // String
        devPart: part,             // Enum
        phoneNumber,               // Int
        portfolio,                 // String
      });
      alert("등록 완료!");
      navigate("/members", { state: { category } });
    } catch (e) {
      alert(e?.response?.data?.message || e.message || "등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <button
        className="add-member-button"
        onClick={() => navigate("/members", { state: { category } })}
      >
        ←
      </button>

      <div className="fixed-background" />

      <div className="add-container">
        <div className="add-box">
          <h2 className="add-title">부원 등록</h2>

          <div className="add-content">
            {/* 사진 업로드 */}
            <div className="photo-upload-wrapper">
              <label
                htmlFor="photo-upload"
                className="photo-circle"
                role="button"
                aria-label="사진 업로드"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="미리보기" className="photo-preview" />
                ) : (
                  "사진 추가"
                )}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onChangePhoto}
              />
            </div>

            {/* 입력 폼 */}
            <div className="form-wrapper">
              <div className="form-row">
                <label>이 름</label>
                <input
                  className="input-box small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="part-wrapper">
                  <label>파 트</label>
                  <input
                    className="input-box small"
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <label>{category === "졸업 부원" ? "취업 회사" : "한 줄 소개"}</label>
                <input
                  className="input-box long"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>포트폴리오</label>
                <input
                  className="input-box medium"
                  placeholder="url을 입력해주세요"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />

                <label>연 락 처</label>
                <input
                  className="input-box medium"
                  placeholder="010-1234-5678"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button className="submit-button" onClick={onSubmit}>
            등 록
          </button>
        </div>
      </div>
    </>
  );
}