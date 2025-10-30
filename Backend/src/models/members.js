import con from "../dbConnection/dbConnection.js";

const TABLE_NAME = "members";

async function getMemberById(id) {
  const result = await con.query(
    `SELECT * FROM ${TABLE_NAME} WHERE id='${id}'`
  );
  return result.rows[0];
}

async function getAll() {
  const result = await con.query(`SELECT * FROM ${TABLE_NAME}`);
  return result.rows;
}

async function getAllMembersWithSkillsAndRoles() {
  const result = await con.query(`
    SELECT 
      m.id,
      m.name,
      m.email,
      m.number,
      COALESCE(json_agg(DISTINCT r.name) FILTER (WHERE r.id IS NOT NULL), '[]') AS roles,
      COALESCE(json_agg(DISTINCT s.name) FILTER (WHERE s.id IS NOT NULL), '[]') AS skills
    FROM members m
    LEFT JOIN member_roles mr ON m.id = mr.member_id
    LEFT JOIN roles r         ON r.id = mr.role_id
    LEFT JOIN member_skills ms ON m.id = ms.member_id
    LEFT JOIN skills s        ON s.id = ms.skill_id
    GROUP BY m.id, m.name, m.email, m.number;
  `);
  return result.rows;
}

export default { 
  getAll, 
  getMemberById, 
  getAllMembersWithSkillsAndRoles 
};