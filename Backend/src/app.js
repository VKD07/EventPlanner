//Setup express app
import cors from "cors";
import express from "express";
import eventRouter from "./routes/events.js"; 
import teamsRouter from "./routes/teams.js";
import eventFlowRouter from "./routes/eventFlows.js"
import membersRouter from "./routes/member.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
  credentials: true // if you send cookies or auth headers
}));

app.use(express.json());
app.use("/events", eventRouter);
app.use("/teams", teamsRouter);
app.use("/eventFlow", eventFlowRouter);
app.use("/members", membersRouter);

export default app;