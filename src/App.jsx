import { Routes, Route } from "react-router-dom";
import EventsDashboard from "./Components/EventDashboard/EventsDashboard";
import EventEditor from "./Components/EventEditor/EventEditor";
import { EventsProvider } from "./Context/EventDataContext";
import EventLayout from "./Components/EventLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsProvider>
        <Routes>
          <Route path="/" element={<EventLayout />}>
            <Route index element={<EventsDashboard />} />
            <Route path="edit/:eventId" element={<EventEditor />} />
          </Route>
        </Routes>
      </EventsProvider>
    </QueryClientProvider>
  );
}

export default App;
