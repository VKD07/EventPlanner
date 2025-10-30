import eventFlow from "../models/eventFlow.js";

export async function getEventFlowByEventID(req, res) {
  try {
    const { id } = req.body; //we create body
    const eventFlowResult = await eventFlow.getEventFlowByEventID(
        id
    ); //we use our db query and pass the id
    res.json(eventFlowResult); //results of the query
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
