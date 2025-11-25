import express from "express";
import * as messageCtrl from "../controllers/messageController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:ticketId", auth, messageCtrl.addMessage);
router.get("/:ticketId", auth, messageCtrl.getMessagesForTicket);

export default router;
