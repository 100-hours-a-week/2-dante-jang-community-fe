const express = require("express");
const path = require("path");
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.static(path.join(__dirname)));

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "main", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login", "index.html"));
});

app.get("/sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signup", "index.html"));
});

app.get("/modify-profile", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "modifyProfile", "index.html"));
});

app.get("/change-password", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "changePassword", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
