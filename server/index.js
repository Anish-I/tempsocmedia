// Correct imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // Corrected import
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import {register} from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js"
import {createPost} from "./controllers/posts.js"

dotenv.config();


/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"),verifyToken, register);
app.post("/posts", verifyToken,upload.single("picture"), createPost);

/*ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

/* BASIC SERVER RESPONSE FOR TESTING */
app.get('/', (req, res) => {
    res.send('Hello World! Server is running.');
});
