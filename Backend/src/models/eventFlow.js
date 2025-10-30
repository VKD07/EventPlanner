import con from "../dbConnection/dbConnection.js";

const TABLE_NAME = "event_flow";
const eventID = "event_id";

async function getEventFlowByEventID(id) {
  const result = await con.query(
    `
    SELECT 
      ef.id,
      ef.time,
      ef.segment,
      m.name AS leader_name
    FROM ${TABLE_NAME} ef
    LEFT JOIN members m ON ef.leader_id = m.id
    WHERE ef.${eventID} = $1
    ORDER BY ef.time
    `,
    [id]
  );
  return result.rows;
}

export default { getEventFlowByEventID };
