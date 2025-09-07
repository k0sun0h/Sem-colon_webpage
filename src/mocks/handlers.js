// src/mocks/handlers.js
import { http, HttpResponse, delay } from 'msw';

const uid = () =>
  (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

/* ===== 날짜 유틸 ===== */
const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (base, days) =>
  new Date(base.getFullYear(), base.getMonth(), base.getDate() + days);

/* ===== 메모리 DB ===== */
const today = new Date();
const db = {
  studies: [
    { // 모집 중
      id: uid(),
      title: '알고리즘 스터디',
      personnel: 4,
      recruitDate: { start: fmt(addDays(today, -1)), end: fmt(addDays(today, 3)) },
      progressDate: { start: fmt(addDays(today, 4)), end: fmt(addDays(today, 20)) },
      content: '매주 2회 진행',
    },
    { // 진행 중
      id: uid(),
      title: 'CS 핵심 정리',
      personnel: 6,
      recruitDate: { start: fmt(addDays(today, -6)), end: fmt(addDays(today, -3)) },
      progressDate: { start: fmt(addDays(today, -2)), end: fmt(addDays(today, 10)) },
      content: '운영체제/네트워크 집중',
    },
    { // 완료
      id: uid(),
      title: '자료구조 끝장내기',
      personnel: 5,
      recruitDate: { start: fmt(addDays(today, -30)), end: fmt(addDays(today, -25)) },
      progressDate: { start: fmt(addDays(today, -24)), end: fmt(addDays(today, -1)) },
      content: '스택/큐/트리/그래프',
    },
  ],
  projects: [
    {
      id: uid(),
      title: '동아리 홈페이지 개편',
      personnel: 5,
      recruitDate: { start: fmt(addDays(today, -2)), end: fmt(addDays(today, 2)) },
      progressDate: { start: fmt(addDays(today, 3)), end: fmt(addDays(today, 30)) },
      content: 'React + Node',
    },
  ],
  applications: new Map(), // `${type}:${id}` -> Set(phoneNumber)
  emailCodes: new Map(),   // email -> { code, expireAt }
  // email -> { userId, name, email, password, major, profileImage }
  users: new Map(),
  members: [],
};

/* ===== 공통 유틸 ===== */
async function readJSON(req) { try { return await req.json(); } catch { return {}; } }
function normalizeRange(r) {
  if (!r) return null;
  if (typeof r === 'string') {
    const [s, e] = r.split('~').map(v => v.trim());
    return { start: s, end: e || s };
  }
  if (typeof r === 'object' && (r.start || r.end)) {
    return { start: r.start, end: r.end || r.start };
  }
  return null;
}
// File -> dataURL (프로필 이미지 저장용)
async function fileToDataURL(file) {
  if (!file || !file.arrayBuffer) return '';
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  const base64 = btoa(binary);
  const mime = file.type || 'application/octet-stream';
  return `data:${mime};base64,${base64}`;
}

export const handlers = [
  /* ==================== 스터디 ==================== */
  http.get('/api/study', async () => {
    await delay(200);
    return HttpResponse.json(db.studies);
  }),
  http.get('/api/study/:id', async ({ params }) => {
    await delay(120);
    const item = db.studies.find(x => x.id === params.id);
    return item ? HttpResponse.json(item) : HttpResponse.text('Not Found', { status: 404 });
  }),
  http.post('/api/study', async ({ request }) => {
    await delay(250);
    const body = await readJSON(request);
    const item = {
      id: uid(),
      title: body.title,
      personnel: Number(body.personnel),
      recruitDate: normalizeRange(body.recruitDate),
      progressDate: normalizeRange(body.progressDate),
      content: body.content ?? '',
    };
    if (!item.title || !item.personnel || !item.recruitDate?.start || !item.recruitDate?.end
      || !item.progressDate?.start || !item.progressDate?.end || !item.content) {
      return HttpResponse.json({ message: '필수 필드 누락' }, { status: 400 });
    }
    db.studies.push(item);
    return HttpResponse.json({ id: item.id }, { status: 201 });
  }),
  http.post('/api/study/:id/apply', async ({ params, request }) => {
    await delay(200);
    const { department, name, phoneNumber, motivation } = await readJSON(request);
    if (!department || !name || !phoneNumber || !motivation) {
      return HttpResponse.json({ message: '필수 필드 누락' }, { status: 400 });
    }
    const exists = db.studies.some(x => x.id === params.id);
    if (!exists) return HttpResponse.text('Not Found', { status: 404 });

    const key = `study:${params.id}`;
    if (!db.applications.has(key)) db.applications.set(key, new Set());
    const bucket = db.applications.get(key);
    const uniq = String(phoneNumber);
    if (bucket.has(uniq)) return HttpResponse.json({ message: '이미 지원한 사용자입니다.' }, { status: 409 });
    bucket.add(uniq);
    return new HttpResponse(null, { status: 204 });
  }),

  /* ==================== 프로젝트 ==================== */
  http.get('/api/project', async () => {
    await delay(200);
    return HttpResponse.json(db.projects);
  }),
  http.get('/api/project/:id', async ({ params }) => {
    await delay(120);
    const item = db.projects.find(x => x.id === params.id);
    return item ? HttpResponse.json(item) : HttpResponse.text('Not Found', { status: 404 });
  }),
  http.post('/api/project', async ({ request }) => {
    await delay(250);
    const body = await readJSON(request);
    const item = {
      id: uid(),
      title: body.title,
      personnel: Number(body.personnel),
      recruitDate: normalizeRange(body.recruitDate),
      progressDate: normalizeRange(body.progressDate),
      content: body.content ?? '',
    };
    if (!item.title || !item.personnel || !item.recruitDate?.start || !item.recruitDate?.end
      || !item.progressDate?.start || !item.progressDate?.end || !item.content) {
      return HttpResponse.json({ message: '필수 필드 누락' }, { status: 400 });
    }
    db.projects.push(item);
    return HttpResponse.json({ id: item.id }, { status: 201 });
  }),
  http.post('/api/project/:id/apply', async ({ params, request }) => {
    await delay(200);
    const { department, name, phoneNumber, motivation } = await readJSON(request);
    if (!department || !name || !phoneNumber || !motivation) {
      return HttpResponse.json({ message: '필수 필드 누락' }, { status: 400 });
    }
    const exists = db.projects.some(x => x.id === params.id);
    if (!exists) return HttpResponse.text('Not Found', { status: 404 });

    const key = `project:${params.id}`;
    if (!db.applications.has(key)) db.applications.set(key, new Set());
    const bucket = db.applications.get(key);
    const uniq = String(phoneNumber);
    if (bucket.has(uniq)) return HttpResponse.json({ message: '이미 지원한 사용자입니다.' }, { status: 409 });
    bucket.add(uniq);
    return new HttpResponse(null, { status: 204 });
  }),

  /* ==================== 이메일 인증 ==================== */
  http.post('/api/auth/email-code', async ({ request }) => {
    await delay(200);
    const { email } = await readJSON(request);
    if (!email) return HttpResponse.json({ message: 'email is required' }, { status: 400 });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expireAt = Date.now() + 5 * 60 * 1000;
    db.emailCodes.set(email, { code, expireAt });
    console.log(`[MSW] 이메일 코드 전송: ${email} -> ${code} (5m)`);
    return new HttpResponse(null, { status: 204 });
  }),
  http.post('/api/auth/email-verify', async ({ request }) => {
    await delay(200);
    const { email, code } = await readJSON(request);
    const rec = db.emailCodes.get(email);
    if (!rec) return HttpResponse.json({ message: '코드가 없습니다.' }, { status: 400 });
    if (Date.now() > rec.expireAt) {
      db.emailCodes.delete(email);
      return HttpResponse.json({ message: '코드가 만료되었습니다.' }, { status: 410 });
    }
    if (String(rec.code) !== String(code)) {
      return HttpResponse.json({ message: '코드가 올바르지 않습니다.' }, { status: 400 });
    }
    db.emailCodes.delete(email);
    return HttpResponse.json({ verified: true });
  }),

  /* ==================== 회원가입 / 로그인 ==================== */
  // 회원가입: JSON 또는 multipart 모두 처리, major/프로필/비밀번호 저장
  http.post('/api/users/signup', async ({ request }) => {
    await delay(250);
    const ctype = request.headers.get('content-type') || '';
    let name, email, userId, password, major, profileImage = '';

    if (ctype.includes('multipart/form-data')) {
      const fd = await request.formData();
      name = fd.get('name'); email = fd.get('email');
      userId = fd.get('userId') || email;
      password = fd.get('password');
      major = fd.get('major') || '';
      const file = fd.get('profileImage');
      profileImage = await fileToDataURL(file);
    } else {
      const body = await readJSON(request);
      ({ name, email, userId, password, major } = body || {});
    }

    if (!name || !email || !userId || !password) {
      return HttpResponse.json({ message: '필수 필드 누락' }, { status: 400 });
    }
    if (db.users.has(email)) {
      return HttpResponse.json({ message: '이미 가입된 이메일입니다.' }, { status: 409 });
    }

    // 비밀번호까지 저장 (개발용이므로 해시 없이 저장)
    db.users.set(email, { userId, name, email, password, major: major || '', profileImage });

    return HttpResponse.json(
      { userId, email, name, major: major || '', profileImage },
      { status: 201 }
    );
  }),

  // 로그인: userId(이메일 또는 아이디) + password 검증
  http.get('/api/login', async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const password = url.searchParams.get('password');
    if (!userId || !password) {
      return HttpResponse.json({ message: '필수 파라미터 누락' }, { status: 400 });
    }

    const rec =
      [...db.users.values()].find(u => u.email === userId || u.userId === userId);

    if (!rec || String(rec.password) !== String(password)) {
      return HttpResponse.json(
        { message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    const { password: _, ...userSafe } = rec; // 비밀번호 제거
    return HttpResponse.json({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: userSafe, // { userId, name, email, major, profileImage }
    });
  }),

  /* ==================== (옵션) 멤버 관리 페이지용 ==================== */
  // GET /api/user
  http.get('/api/user', async () => {
    await delay(120);
    return HttpResponse.json(db.members);
  }),

  // POST /api/user (multipart: name, image, introduction, devPart, phoneNumber, portfolio)
  http.post('/api/user', async ({ request }) => {
    await delay(180);
    const fd = await request.formData();
    const item = {
      id: uid(),
      name: fd.get('name') || '',
      introduction: fd.get('introduction') || '',
      devPart: fd.get('devPart') || '',
      phoneNumber: fd.get('phoneNumber') || '',
      portfolio: fd.get('portfolio') || '',
      image: await fileToDataURL(fd.get('image')),
    };
    db.members.push(item);
    return HttpResponse.json(item, { status: 201 });
  }),

  // DELETE /api/user  (body: { id })
  http.delete('/api/user', async ({ request }) => {
    await delay(120);
    const { id } = await readJSON(request);
    const before = db.members.length;
    db.members = db.members.filter(m => m.id !== id);
    const ok = db.members.length !== before;
    return ok ? new HttpResponse(null, { status: 204 }) :
                HttpResponse.text('Not Found', { status: 404 });
  }),
];
