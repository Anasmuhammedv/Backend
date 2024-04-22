import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
