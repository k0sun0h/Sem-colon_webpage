import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MembersAPI } from "../../api/index.jsx";
import "../../css/Members.css";

export default function Members() {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category || "운영진");
  const [serverMembers, setServerMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 서버 목록 조회
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        let list = await MembersAPI.list();
        if (!Array.isArray(list)) list = [list]; // 안전 처리
        setServerMembers(list ?? []);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 화면 표시용 매핑
  const currentFromServer = serverMembers.map((m) => ({
    id: m.id,
    name: m.name,
    position: "부원",
    description: m.introduction,
    part: m.devPart,
    contact: m.phoneNumber,
    portfolio: m.portfolio,
    image: m.imageUrl || m.image || "",
  }));

  const memberData = {
    운영진: [
      {
        name: "홍길동",
        position: "회장",
        description: "책임감 있고 뛰어난 리더십의 PM",
        part: "프론트엔드",
        contact: "010-XXXX-XXXX",
        portfolio: "https://example.com/hong",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC3VqzAwDdyNtTWgitKl6IhyjHlJzjENeEEQ&s",
      },
      {
        name: "임꺽정",
        position: "부회장",
        description: "통찰력 있고 활발한 소통의 PM",
        part: "백엔드",
        contact: "010-XXXX-XXXX",
        portfolio: "https://example.com/lim",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxydJ04EO4RH4EDaRxuMjuOZ037pMmpOrrBg&s",
      },
    ],
    "현재 부원": currentFromServer ?? [],
    "졸업 부원": [],
  };

  const list = memberData[category] ?? [];

  return (
    <>
      <div className="fix-background"></div>

      <div className="members-wrapper1">
        <div className="members-category1">
          {["운영진", "현재 부원", "졸업 부원"].map((label) => (
            <button
              key={label}
              className={`members-tab1 ${category === label ? "active" : ""}`}
              onClick={() => setCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && <div className="empty-message">로딩중…</div>}
        {error && (
          <div className="empty-message" style={{ color: "tomato" }}>
            {error}
          </div>
        )}

        <div className="members-grid1">
          {!loading && list.length === 0 ? (
            <div className="empty-message">아직 등록된 멤버가 없습니다.</div>
          ) : (
            list.map((member, idx) => (
              <div className="member-card1" key={member.id ?? idx}>
                <div className="member-left">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="member-image1"
                    />
                  ) : (
                    <div
                      className="member-image1"
                      style={{ background: "#e5e5e5" }}
                    />
                  )}
                </div>
                <div className="member-right">
                  <div className="member-name1">{member.name}</div>
                  <div className="member-role1">
                    {category === "졸업 부원"
                      ? "졸업생"
                      : member.position || "부원"}
                  </div>
                  <div className="member-desc1">{member.description}</div>
                  <div className="member-part1">파트: {member.part}</div>
                  <div className="member-footer1">
                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolio-link"
                      >
                        포트폴리오 보기
                      </a>
                    )}
                    {member.contact && (
                      <span className="contact1">{member.contact}</span>
                    )}
                  </div>

                  {/* 서버 데이터일 때만 삭제 버튼 노출 */}
                  {member.id && (
                    <div style={{ marginTop: 8 }}>
                      <button
                        onClick={async () => {
                          if (!confirm("정말 삭제하시겠습니까?")) return;
                          try {
                            await MembersAPI.remove({ id: member.id });
                            setServerMembers((prev) =>
                              prev.filter((m) => m.id !== member.id)
                            );
                          } catch (e) {
                            alert(e?.response?.data?.message || e.message);
                          }
                        }}
                        style={{
                          padding: "6px 10px",
                          border: "1px solid #ccc",
                          borderRadius: 6,
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {(category === "현재 부원" || category === "졸업 부원") && (
        <button
          className="add-member-button"
          onClick={() => navigate("/members/add", { state: { category } })}
        >
          ＋
        </button>
      )}
    </>
  );
}