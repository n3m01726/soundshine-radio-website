const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const installRouter = require("./routes/install");
const apiRouter = require("./routes/api");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/install", installRouter);
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Soundshine RadioDJ Backend API");
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
