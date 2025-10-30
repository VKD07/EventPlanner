import event from "../models/event.js";

export async function getEvents(req, res) {
  try {
    const events = await event.getAll();
    res.json(events); //sending to front end
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addEvent(req, res) {
  try {
    const { title, day, month, year, location, description } = req.body;
    const newEvent = await event.create(
      title,
      day,
      month,
      year,
      location,
      description
    );
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
