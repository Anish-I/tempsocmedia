import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js"; // Change likePosts to likePost
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userID/posts", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost); // Make sure this matches the function name

export default router;
