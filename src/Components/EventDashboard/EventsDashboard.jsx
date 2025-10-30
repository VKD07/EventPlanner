import { useState, useCallback } from "react";
import Calendar from "./Calendar";
import ConsoleDebug from "../ConsoleDebug";
import CreatedEvents from "./CreatedEvents";
import EventCreationModal from "./EventCreationModal";
import Header from "./Header";
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
    <>
      <Header />
      <ConsoleDebug componentName="Event Dashboard" />

      <div className="flex flex-col gap-5 h-screen lg:grid grid-cols-[25%_50%_21%]">
        <div className="pt-20">
          <Calendar onDateClicked={handleDateClicked} />
          <CreatedEvents />
        </div>
        <EventCreationModal isOpen={isModalOpen} onClose={closeModal} />
        <EventDetails />
        <EventMembersDetails />
      </div>
    </>
  );
};

export default EventsDashboard;