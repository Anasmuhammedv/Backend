import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import authRouter from "./Routes/authRoutes.js";
import adminRoute from './Routes/adminRoute.js'

const app = express();

const PORT = process.env.PORT || 4000;

// middle wares
app.use(express.json())

//usersRoute
app.use('/api/users', authRouter),


//adminRoute
app.use('/api/admin',adminRoute),


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
  .catch((error) => console.log(error));



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
