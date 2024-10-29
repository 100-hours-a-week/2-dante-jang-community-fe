const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname)));  // src 디렉토리를 정적 파일로 제공

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "main", "index.html"));  // index.html 파일 경로
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login", "index.html"));  // index.html 파일 경로
});

app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signup", "index.html"));  // index.html 파일 경로
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
