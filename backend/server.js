const express = require("express");
const router = express.Router();
const mainRouter = require("./routes/index.js");

const app = express();
app.use(express.json());

app.use("/api/v1", mainRouter);

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
