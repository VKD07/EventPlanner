import { Outlet } from "react-router-dom";
import EventNavigation from "./EventNavigation";
import Header from "./EventDashboard/Header";

function EventLayout() {
  return (
    <>
      <Header />
      <div className="flex lg:grid lg:gap-7 lg:grid-cols-[60px_1fr]">
        <div className="hidden lg:block">
          <EventNavigation />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default EventLayout;
