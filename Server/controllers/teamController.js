import Team from "../models/team.js";

// List all team members
export const listTeam = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    console.log("Teams from DB:", teams);
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Create a new team member
export const createMember = async (req, res) => {
  try {
    const { Username, EmailID, role = "member" } = req.body;

    const exists = await Team.findOne({ EmailID });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    if (role === "admin") {
      const adminExists = await Team.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({ message: "Only one admin is allowed" });
      }
    }

    const team = await new Team({ Username, EmailID, role }).save();

    res.json({
      message: "User created",
      team: { id: team._id, EmailID: team.EmailID, Username: team.Username,role:team.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Team Member", error: error.message });
  }
};

// Delete a team member
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);

    if (!team) return res.status(404).json({ message: "Team Member Not Found" });
    if (team.role === "admin") return res.status(403).json({ message: "Cannot delete admin" });

    const deleteTeam = await Team.findByIdAndDelete(id)
    res.json({ message: "Deleted successfully",deleteTeam });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};
