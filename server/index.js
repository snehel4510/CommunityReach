import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from "path";

import { fileURLToPath } from 'url';
import { verifyToken } from "./middleware/require_auth.js";

import { register } from "./controllers/authc.js";
import { createPost } from "./controllers/postc.js";
import { createComm } from "./controllers/commc.js";
// import { editUser } from "./controllers/userc.js";
import { editPost } from "./controllers/postc.js";
import { editComm } from "./controllers/commc.js";

import authRoutes from "./routes/authr.js";
import userRoutes from "./routes/userr.js";
import postRoutes from "./routes/postr.js";
import commRoutes from "./routes/commr.js";

// miidlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/comms", verifyToken, upload.single("picture"), createComm);
// app.patch("/users/:uid", verifyToken, upload.single("picture"), editUser);
app.patch("/posts/:pid", verifyToken, upload.single("picture"), editPost);
app.patch("/comms/:cid", verifyToken, upload.single("picture"), editComm);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comms", commRoutes);

/* MONGOOSE SETUP */
// const PORT = process.env.PORT || 6001;
const PORT = 6001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));