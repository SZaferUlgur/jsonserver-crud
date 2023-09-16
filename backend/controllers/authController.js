const fs = require("fs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const secretKey = "123456789";
const expiresIn = "1h";

const userDB = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

function isLoginAuth(email, password) {
  return (
    userDB.users.findIndex(
      (user) =>
        user.email === email && bcrypt.compareSync(password, user.password)
    ) !== -1
  );
}

function isRegAuth({ email }) {
  return userDB.users.findIndex((user) => user.email === email) !== -1;
}

function creteToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (isRegAuth({ email })) {
    return res.status(401).json({ message: "Kullanıcı Zaten Mevcuttur" });
  }
  fs.readFile("./db.json", async (err, data) => {
    if (err) {
      return res.status(401).json({ message: err });
    }
    data = JSON.parse(data.toString());
    let sonID = data.users.length;
    //  crypto
    const salt = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(req.body.password, salt);
    let password = hassPass;
    data.users.push({ id: sonID + 1, email, password });
    fs.writeFile("./db.json", JSON.stringify(data), (err) => {
      if (err) {
        const status = 401;
        return res.status(status).json({ status, message });
      }
    });
  });
  const token = creteToken({ email, password });
  return res.send(200).json({ token });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!isLoginAuth(email, password)) {
    res.status(400).json({ message: "Email Yada Şifre Hatalı" });
  } else {
    const token = await creteToken({ email, password });
    return res.status(200).json({ token, email });
  }
});

module.exports = { register, login };
