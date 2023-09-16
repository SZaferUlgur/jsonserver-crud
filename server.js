const express = require("express");
const PORT = 5000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/auth", require("./routes/authRouter"))
app.use("/api/posts", require("./routes/postsRoutes"))

app.listen(PORT, () =>
  console.log(`Sunucu ${PORT} portu üzerinde çalışmaktadır`)
);
