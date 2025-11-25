import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  headerColor: { type: String, default: "#001f8b" },
  backgroundColor: { type: String, default: "#ffffff" },
  initialMessage: { type: String, default: "Hi! How can we help you today?" },
  introForm: {
    name: { type: Boolean, default: true, required: true, placeholder: { type: String, default: "Your name" } },
    email: { type: Boolean, default: true, required: true, placeholder: { type: String, default: "Your email" } },
    phone: { type: Boolean, default: true, placeholder: { type: String, default: "Your phone" } },
  },
  popMessageText: { type: String, default: "Chat with us" },
  missedChatTimer: { type: Number, default: 5 }, // minutes
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
