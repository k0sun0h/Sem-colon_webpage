import api from "./client.jsx";

// ===== Auth =====
export const AuthAPI = {
  // GET /api/login?userId=...&password=...
  async login({ userId, password }) {
    const { data } = await api.get("/api/login", {
      params: { userId, password },
    });
    return data; // { accessToken, refreshToken }
  },
  async logout() {
    return;
  },
  // POST /api/users/signup
  async register({ name, email, userId, password }) {
    const payload = { name, email, userId, password };
    const { data } = await api.post("/api/users/signup", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data; // { userId, email, name }
  },
};

// ===== Members(User) =====
export const MembersAPI = {
  // GET /api/user
  async list() {
    const { data } = await api.get("/api/user");
    // 배열이 아닐 경우 배열로 감싸기
    return Array.isArray(data) ? data : [data];
  },
  // POST /api/user (multipart/form-data)
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
  // DELETE /api/user  (body: { id })
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