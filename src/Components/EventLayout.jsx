import { Outlet } from "react-router-dom";
import EventNavigation from "./EventNavigation";
import Header from "./EventDashboard/Header";

function EventLayout() {
  return (
    <>
      <Header />
      <div className="grid gap-7 grid-cols-[5%_93%]">
        <div>
          <EventNavigation />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default EventLayout;
