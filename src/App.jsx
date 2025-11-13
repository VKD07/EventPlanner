import EventsDashboard from "./Components/EventDashboard/EventsDashboard";
import EventEditor from "./Components/EventEditor/EventEditor";
import EventLayout from "./Components/EventLayout";
import Login from "./Components/Authentication/Login";
import { Routes, Route } from "react-router-dom";
import { EventsProvider } from "./Context/EventDataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<EventLayout />}>
            <Route path="dashboard" element={<EventsDashboard />} />
            <Route path="edit/:eventId" element={<EventEditor />} />
          </Route>
        </Routes>
      </EventsProvider>
    </QueryClientProvider>
  );
}

export default App;
