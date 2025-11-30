import express from "express";
import { signup, login ,getAllUsers,deleteUser,getAdmin,updateAdmin } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/users", auth,requireAdmin,getAllUsers);
router.delete("/users/:id", auth,requireAdmin, deleteUser); 

// New routes for admin updating own details
router.get("/admin", auth, getAdmin); // fetch current admin
router.put("/admin", auth, updateAdmin); // update password/email

export default router;
