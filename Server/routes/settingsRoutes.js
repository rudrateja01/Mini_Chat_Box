import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import auth from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", auth, getSettings);
router.put("/", auth, requireAdmin, updateSettings);

export default router;
