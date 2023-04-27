import express from "express";
import { getFeedPosts, getUserPosts, getCommPosts, bookPost, likePost } from "../controllers/postc.js";
import { verifyToken } from "../middleware/require_auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:commId/posts", verifyToken, getCommPosts);

/* UPDATE */
router.patch("/:pid/book", verifyToken, bookPost);
router.patch("/:pid/like", verifyToken, likePost);

export default router;