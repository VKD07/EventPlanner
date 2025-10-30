import teamsModel from "../models/teams.js";

export async function getTeams(req, res) {
  try {
    const events = await teamsModel.getAll();
    res.json(events); //sending to front end
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllTeamsAndItsMembers(req, res) {
  try {
    const events = await teamsModel.getAllTeamsAndItsMembers();
    res.json(events); //sending to front end
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTeamAndMembersByEventID(req, res) {
  try {
    const { id } = req.body;
    const result = await teamsModel.getTeamsByEventId(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addMemberIntoTeam(req, res) {
  try {
    const { teamId, memberId } = req.body;
    const result = await teamsModel.AddMemberIntoTeam(teamId, memberId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeMemberFromTeam(req, res) {
  try {
    const { teamId, memberId } = req.body;
    const result = await teamsModel.RemoveMemberFromTeam(teamId, memberId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function UpdateTeamName(req, res) {
  try {
    const { teamId, teamName } = req.body;
    const result = await teamsModel.UpdateTeamName(teamId, teamName);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}