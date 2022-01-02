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

app.use("/", authRoutes);
app.use("/tests", testClientRoutes);
app.use("/admin/tests", testAdminRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connected to Mongodb Atlas.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
