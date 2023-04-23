import express from "express";
import { getAllComms, getComm, getCommMembers, getCommPosts } from "../controllers/commc.js";
import { verifyToken } from "../middleware/require_auth.js";

const router = express.Router();

// create routes for all these controller functions
router.get("/", verifyToken, getAllComms);
router.get("/:id", verifyToken, getComm);
router.get("/:id/members", verifyToken, getCommMembers);
router.get("/:id/posts", verifyToken, getCommPosts);

export default router;