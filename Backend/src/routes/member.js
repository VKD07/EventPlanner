import express from "express";
import { getAllMembers, getMemberById, getAllMembersWithSkillsAndRoles } from "../controllers/membersController.js";

const router = express.Router();

router.get("/", getAllMembers);
router.get("/details", getAllMembersWithSkillsAndRoles);
router.post("/", getMemberById);

export default router;