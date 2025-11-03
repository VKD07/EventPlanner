import { useState } from "react";
import ConsoleDebug from "../ConsoleDebug";
import { useEventsContext } from "../../Context/EventDataContext";
import { useEvent } from "../../hooks/useEvents";

const Calendar = ({ onDateClicked }) => {
  const { selectedDate, setSelectedDate } = useEventsContext();

  const { data: event, isLoading, isError, error } = useEvent();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 = Jan
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon...
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Build days array
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // empty cells before day 1
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="w-[95%] h-auto bg-amber-300 rounded-3xl py-4 px-5 place-items-left lg:w-auto">
      <ConsoleDebug componentName="Calendar" />

      {/* Header with Prev/Next */}
      <div className="flex items-center mb-2">
        <div className="flex gap-2 font-bold py-2 lg:text-[15px]">
          <span>{monthNames[currentMonth]}</span>
          <span>{currentYear}</span>
        </div>

        <div className="flex ml-auto lg:flex">
          <button
            onClick={handlePrev}
            className="bg-amber-500 text-white px-2 py-1 rounded-full mr-2 text-sm hover:bg-amber-600 transform hover:scale-110 transition"
          >
            P
          </button>
          <button
            onClick={handleNext}
            className="bg-amber-500 text-white px-2 py-1 rounded-full text-sm hover:bg-amber-600 transform hover:scale-110 transition"
          >
            N
          </button>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 text-center font-bold mb-2 lg:text-[10px]">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const hasEvent = event?.some((ev) => {
            const eventDate = new Date(ev.eventDate);
            return (
              eventDate.getDate() === day &&
              eventDate.getMonth() === currentMonth && // use number comparison
              eventDate.getFullYear() === currentYear
            );
          });

          return (
            <span
              key={index}
              className={`py-2 rounded-full
          ${day ? "hover:bg-amber-400" : ""}
          ${isToday ? "bg-amber-600/50 text-white" : ""}
          ${hasEvent ? "bg-blue-500 text-white" : ""}
          ${isToday && hasEvent ? "bg-red-500 text-white" : ""}
        `}
            >
              <button
                onClick={() => {
                  onDateClicked();
                  const dateSelected = new Date(currentYear, currentMonth, day);
                  setSelectedDate(dateSelected);
                }}
              >
                {day || ""}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
