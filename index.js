const mongoose = require("mongoose");
const express = require("express");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

const authRoutes = require("./routes/userRoutes");
const testClientRoutes = require("./routes/clientTestRoutes");
const testAdminRoutes = require("./routes/adminTestRoutes");
const scaleRoutes = require("./routes/scaleRoutes");
const itemRoutes = require("./routes/itemRoutes");
const answerRoutes = require("./routes/answerRoutes");

app.use("/", authRoutes);
app.use("/tests", testClientRoutes);
app.use("/admin/tests", testAdminRoutes);
app.use("/tests/:testId/scales", scaleRoutes);
app.use("/tests/:testId/items", itemRoutes);
app.use("/items/:itemId/answers", answerRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to Mongodb Atlas.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
