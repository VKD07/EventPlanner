import express from "express";
import {
  getTeams,
  getAllTeamsAndItsMembers,
  getTeamAndMembersByEventID,
  addMemberIntoTeam,
  removeMemberFromTeam,
  UpdateTeamName,
} from "../controllers/teamsController.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/with-members", getAllTeamsAndItsMembers);
router.post("/by-event", getTeamAndMembersByEventID);
router.post("/add-member", addMemberIntoTeam);
router.post("/remove-member", removeMemberFromTeam);
router.post("/update-team-name", UpdateTeamName);

export default router;
