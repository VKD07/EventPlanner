// Models communicate with DB
import con from "../dbConnection/dbConnection.js";

const tableName = "teams";

async function getAll() {
  const result = await con.query(`SELECT * FROM ${tableName}`);
  return result.rows;
}

async function getAllTeamsAndItsMembers() {
  const q = `
    SELECT
      t.id,
      t.name,
      t.event_id,
      COALESCE(
        json_agg(
          json_build_object(
            'id', m.id,
            'name', m.name,
            'email', m.email,
            'number', m.number
          )
          ORDER BY m.name
        ) FILTER (WHERE m.id IS NOT NULL),
        '[]'::json
      ) AS members
    FROM teams t
    LEFT JOIN team_members tm ON tm.team_id = t.id
    LEFT JOIN members m       ON m.id = tm.member_id
    GROUP BY t.id, t.name, t.event_id
    ORDER BY t.name;
  `;
  const { rows } = await con.query(q);
  return rows;
}

async function getTeamsByEventId(eventId) {
  const q = `
    SELECT
      t.id AS team_id,
      t.name AS team_name,
      m.id AS member_id,
      m.name AS member_name,
      m.email,
      m.number
    FROM ${tableName} t
    LEFT JOIN team_members tm ON t.id = tm.team_id
    LEFT JOIN members m ON tm.member_id = m.id
    WHERE t.event_id = $1
    ORDER BY t.name, m.name;
  `;

  const { rows } = await con.query(q, [eventId]);
  return rows;
}


async function AddMemberIntoTeam(teamId, memberId) {
  const q = `
    INSERT INTO team_members(team_id, member_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const { rows } = await con.query(q, [teamId, memberId]);
  return rows[0];
}

async function RemoveMemberFromTeam(teamId, memberId) {
  const q = `DELETE FROM team_members WHERE team_id = $1 AND member_id = $2`;
  const { rows } = await con.query(q, [teamId, memberId]);
  return rows[0];
}

async function UpdateTeamName(teamId, newName) {
  const q = `UPDATE ${tableName} SET name = $1 WHERE id = $2 RETURNING *`;
  const { rows } = await con.query(q, [newName, teamId]);
  return rows[0];
}

export default {
  getAll,
  getAllTeamsAndItsMembers,
  getTeamsByEventId,
  AddMemberIntoTeam,
  RemoveMemberFromTeam,
  UpdateTeamName
};
