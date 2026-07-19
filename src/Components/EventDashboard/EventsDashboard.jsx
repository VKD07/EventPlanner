import { useState, useCallback } from "react";
import Calendar from "./Calendar";
import ConsoleDebug from "../ConsoleDebug";
import CreatedEvents from "./CreatedEvents";
import EventCreationModal from "./EventCreationModal";
import EventDetails from "./EventDetails";
import EventMembersDetails from "./EventMembersDetails";


const EventsDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDateClicked(date) {
    setIsModalOpen(true);
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink to-pew">
      <ConsoleDebug componentName="Event Dashboard" />

      <div className="flex flex-col gap-6 px-4 pt-24 pb-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:px-8 max-w-[1800px] mx-auto">
        {/* Left Sidebar - Calendar & Events */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Calendar onDateClicked={handleDateClicked} />
          <CreatedEvents />
        </div>

        {/* Main Content - Event Details */}
        <div className="lg:col-span-6">
          <EventDetails />
        </div>

        {/* Right Sidebar - Team Members */}
        <div className="lg:col-span-3">
          <EventMembersDetails />
        </div>
      </div>

      <EventCreationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default EventsDashboard;