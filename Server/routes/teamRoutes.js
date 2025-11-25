import express from "express";
import { listTeam, createMember, deleteMember } from "../controllers/teamController.js";
import auth from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", auth, requireAdmin, listTeam);
router.post("/", auth, requireAdmin, createMember);
router.delete("/:id", auth, requireAdmin, deleteMember);

export default router;
