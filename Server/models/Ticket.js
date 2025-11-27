import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true }, // human-readable id
  user: {
    name: String,
    email: String,
    phone: String,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin default
  status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
