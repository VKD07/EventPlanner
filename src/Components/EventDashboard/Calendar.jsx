import { useState } from "react";
import ConsoleDebug from "../ConsoleDebug";
import { useEventsContext } from "../../Context/EventDataContext";
import { useEvent } from "../../hooks/useEvents";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const Calendar = ({ onDateClicked }) => {
  const { selectedDate, setSelectedDate } = useEventsContext();

  const { data: event } = useEvent();

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
    <div className="w-full bg-pew rounded-2xl shadow-xl border border-brass/15 p-6 hover:shadow-2xl transition-shadow">
      <ConsoleDebug componentName="Calendar" />

      {/* Header with Prev/Next */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrev}
          className="p-2 rounded-lg hover:bg-pew-light transition-colors active:scale-95 text-parchment/60 hover:text-parchment"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          <h2 className="font-display text-lg md:text-xl font-semibold text-parchment">
            {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-lg hover:bg-pew-light transition-colors active:scale-95 text-parchment/60 hover:text-parchment"
          aria-label="Next month"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 text-center font-medium mb-2 text-xs text-parchment/40 uppercase tracking-wider">
        <span className="py-2">Sun</span>
        <span className="py-2">Mon</span>
        <span className="py-2">Tue</span>
        <span className="py-2">Wed</span>
        <span className="py-2">Thu</span>
        <span className="py-2">Fri</span>
        <span className="py-2">Sat</span>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const hasEvent = event?.some((ev) => {
            const eventDate = new Date(ev.eventDate);
            return (
              eventDate.getDate() === day &&
              eventDate.getMonth() === currentMonth &&
              eventDate.getFullYear() === currentYear
            );
          });

          const isSelected =
            day &&
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

          return (
            <div
              key={index}
              className="aspect-square flex items-center justify-center"
            >
              {day ? (
                <button
                  onClick={() => {
                    onDateClicked();
                    const dateSelected = new Date(currentYear, currentMonth, day);
                    setSelectedDate(dateSelected);
                  }}
                  className={`
                    w-full h-full rounded-lg font-medium text-sm font-mono
                    transition-all duration-200 relative
                    ${isSelected ? "ring-2 ring-brass ring-offset-2 ring-offset-pew" : ""}
                    ${isToday && !hasEvent ? "bg-brass text-inkwell font-semibold shadow-lg shadow-brass/30" : ""}
                    ${hasEvent && !isToday ? "bg-brass/15 text-brass-light font-semibold border border-brass/30" : ""}
                    ${isToday && hasEvent ? "bg-brass text-inkwell font-semibold shadow-lg shadow-brass/30" : ""}
                    ${!isToday && !hasEvent ? "text-parchment/70 hover:bg-pew-light hover:text-parchment" : ""}
                    hover:scale-105 active:scale-95
                  `}
                >
                  {day}
                  {hasEvent && (
                    <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isToday ? 'bg-inkwell' : 'bg-brass'}`}></span>
                  )}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-brass/15 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-brass rounded shadow-sm"></div>
          <span className="text-parchment/50">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-brass/15 border border-brass/30 rounded"></div>
          <span className="text-parchment/50">Has Event</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
