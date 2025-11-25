import Settings from "../models/Settings.js";

// Get settings
export const getSettings = async (req, res) => {
  try {
    // Check if settings exist in DB
    let settings = await Settings.findOne();

    // If not found, create default settings
    if (!settings) {
      settings = await new Settings({}).save();
    }

    // Send response
    res.json({ settings });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    // Check if settings exist
    let settings = await Settings.findOne();

    // If not, create new settings
    if (!settings) {
      settings = await Settings.create({});
    }

    // Update settings with new values from request body
    Object.assign(settings, req.body);

    // Save updated settings
    await settings.save();

    res.json({ message: "Settings updated successfully", settings });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
