const express = require("express");
const router = express.Router();
const mainRouter = require("./routes/index.js");

const app = express();
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ msg: "Invalid JSON format in request body" });
  }
  next();
});

app.use("/api/v1", mainRouter);

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
