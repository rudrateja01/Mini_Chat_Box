import Ticket from "../models/Ticket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import generateTicketId from "../utils/generateTicketId.js";

// Create ticket from public form
export const createTicket = async (req, res) => {
  try {
    const { name, email, phone, initialMessage } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name & email are required" });
    }

    // Find admin to assign by default
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      return res.status(500).json({ message: "No admin found to assign ticket" });
    }

    // Create ticket
    const ticketId = generateTicketId();
    const ticket = await Ticket.create({
      ticketId,
      user: { name, email, phone },
       assignedTo: admin._id,
      status: "open",
    });

    // Add initial message if provided
    if (initialMessage) {
      const msg = await Message.create({
        ticketId: ticket._id,
        // senderId: req.user ? req.user._id : null,  // Public user
        text: initialMessage,
      });

      ticket.messages.push(msg._id);
      await ticket.save();
    }

    res.json({ message: "Ticket created", ticketId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket", error: error.message });
  }
};

// Get all tickets
export const getTickets = async (req, res) => {
  try {
    // Only ADMIN can see all tickets
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const tickets = await Ticket.find()
      .populate("assignedTo", "name email")
      .populate({
        path: "messages",
        select: "text senderId timestamp",
        populate: { path: "senderId", select: "name" }
      })
      .sort({ updatedAt: -1 });

    res.json({ tickets });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets", error: error.message });
  }
};


// Get single ticket by ticketId
export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.id })
      .populate("assignedTo", "name email")
      .populate({
        path: "messages",
        select: "text senderId timestamp",
        populate: { path: "senderId", select: "name" }
      });

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const formattedMessages = ticket.messages.map(msg => ({
      text: msg.text,
      // sender: msg.senderId ? msg.senderId.name : "Public User",
      timestamp: msg.timestamp
    }));

    res.json({ 
      ...ticket.toObject(), 
      messages: formattedMessages 
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ticket", error: error.message });
  }
};

// Assign a ticket to a user (admin only)
export const assignTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;       // get ticket ID from URL
    const { assignedId } = req.body;       // get user ID from request body

    // Find the ticket in the database
    const ticket = await Ticket.findById({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    // Find the user to assign
    const user = await User.findById(assignedId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Assign the ticket
    ticket.assignedTo = user._id;
    await ticket.save();

    res.json({
      message: "Ticket assigned successfully",
      ticket: {
        ticketId: ticket.ticketId,
        assignedTo: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        status: ticket.status
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to assign ticket", error: error.message });
  }
};


// Update ticket status
export const updateStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.json({ message: "Ticket status updated", ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};
