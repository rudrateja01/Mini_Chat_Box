import express from "express";
import Ticket from "../models/Ticket.js";
import Message from "../models/Message.js";

const router = express.Router();

// Calculate analytics
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("messages");

    if (!tickets.length) {
      return res.json({ analytics: null });
    }

    // 1️⃣ Average Reply Time (admin → first reply)
    let replyTimes = [];

    tickets.forEach(ticket => {
      if (!ticket.messages || ticket.messages.length < 2) return;

      const firstMessage = ticket.messages[0];
      const firstAdminMessage = ticket.messages.find(m => m.senderId != null);

      if (!firstAdminMessage) return;

      const diffMs = new Date(firstAdminMessage.timestamp) - new Date(firstMessage.timestamp);
      const diffMinutes = diffMs / 60000;

      replyTimes.push(diffMinutes);
    });

    const avgReplyTime =
      replyTimes.length ? replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length : 0;

    // 2️⃣ Resolved Percentage
    const resolvedTickets = tickets.filter(t => t.status === "resolved");
    const resolvedPercent = Math.round((resolvedTickets.length / tickets.length) * 100);

    // 3️⃣ Total Chats
    const totalChats = tickets.length;

    res.json({
      analytics: {
        avgReplyTime: Math.round(avgReplyTime),
        resolvedPercent,
        totalChats,
      },
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
