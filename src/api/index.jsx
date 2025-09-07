import api from "./client.jsx";

// ===== Auth =====
export const AuthAPI = {
  // 로그인
  async login({ userId, password }) {
    const { data } = await api.get("/api/login", {
      params: { userId, password },
    });
    return data; // { accessToken, refreshToken, user? }
  },

  async logout() {
    return;
  },

  // 회원가입 (multipart)
  async register({ name, email, userId, password, major, profileImage }) {
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("userId", userId || email);
    form.append("password", password);
    if (major) form.append("major", major);
    if (profileImage) form.append("profileImage", profileImage);

    const { data } = await api.post("/api/users/signup", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data; // { userId, email, name, major?, profileImage? }
  },

  // === 이메일 인증 코드 전송 ===
  async sendEmailCode({ email }) {
    // MSW 핸들러: POST /api/auth/email-code
    // 성공시 204 No Content
    await api.post("/api/auth/email-code", { email });
    return true;
  },

  // === 추가: 이메일 인증 코드 검증 ===
  async verifyEmailCode({ email, code }) {
    // MSW 핸들러: POST /api/auth/email-verify
    // 성공시 { verified: true }
    const { data } = await api.post("/api/auth/email-verify", { email, code });
    return !!data?.verified;
  },
};

// ===== Members(User) =====
export const MembersAPI = {
  async list() {
    const { data } = await api.get("/api/user");
    return Array.isArray(data) ? data : [data];
  },
  async create({ name, imageFile, introduction, devPart, phoneNumber, portfolio }) {
    const form = new FormData();
    form.append("name", name);
    if (imageFile) form.append("image", imageFile);
    form.append("introduction", introduction || "");
    form.append("devPart", devPart);
    form.append("phoneNumber", phoneNumber || "");
    form.append("portfolio", portfolio || "");
    await api.post("/api/user", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async remove({ id }) {
    await api.delete("/api/user", { data: { id } });
  },
};

// ===== Study =====
export const StudyAPI = {
  async create({ title, personnel, recruitDate, progressDate, content }) {
    await api.post("/api/study", {
      title,
      personnel,
      recruitDate,
      progressDate,
      content,
    });
  },
  async apply(id, { department, name, phoneNumber, motivation, portfolio, tool }) {
    await api.post(`/api/study/${id}/apply`, {
      department,
      name,
      phoneNumber,
      motivation,
      portfolio,
      tool,
    });
  },
  async list() {
    const { data } = await api.get("/api/study");
    return data;
  },
  async detail(id) {
    const { data } = await api.get(`/api/study/${id}`);
    return data;
  },
};

// ===== Project =====
export const ProjectAPI = {
  async create({ title, personnel, recruitDate, progressDate, content }) {
    await api.post("/api/project", {
      title,
      personnel,
      recruitDate,
      progressDate,
      content,
    });
  },
  async apply(id, { department, name, phoneNumber, motivation, portfolio, tool }) {
    await api.post(`/api/project/${id}/apply`, {
      department,
      name,
      phoneNumber,
      motivation,
      portfolio,
      tool,
    });
  },
  async list() {
    const { data } = await api.get("/api/project");
    return data;
  },
  async detail(id) {
    const { data } = await api.get(`/api/project/${id}`);
    return data;
  },
};
