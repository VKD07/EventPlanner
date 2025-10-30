import members from "../models/members.js";

export async function getMemberById(req, res) {
  try {
    const { id } = req.body;
    const result = await members.getMemberById(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllMembers(req, res) {
  try {
    const result = await members.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllMembersWithSkillsAndRoles(req, res) {
  try {
    const result = await members.getAllMembersWithSkillsAndRoles();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
