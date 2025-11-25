import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  EmailID: { type: String, required: true, unique: true },
  Designation: { type: String, enum: ["admin", "member"], default: "member" },
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.model("team", teamSchema);

export default Team;
