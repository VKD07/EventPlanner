import { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const skills = [
    { id: crypto.randomUUID(), name: "Singing" },
    { id: crypto.randomUUID(), name: "Dancing" },
    { id: crypto.randomUUID(), name: "Tech" },
  ];

  const role = [
    { id: crypto.randomUUID(), name: "Leader" },
    { id: crypto.randomUUID(), name: "Coordinator" },
    { id: crypto.randomUUID(), name: "Runner" },
  ];

  const memberFilters = [
    { id: crypto.randomUUID(), name: "Skills", elements: skills },
    { id: crypto.randomUUID(), name: "Role", elements: role },
  ];

  const initMembers = [
    {
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "@gmail.com",
      number: "+971553279096",
      role: [role[0].name, role[1].name],
      skills: [skills[0].name, skills[1].name],
    },
    {
      id: crypto.randomUUID(),
      name: "Mike Butowski",
      email: "@gmail.com",
      number: "+971553279096",
      role: [role[1].name],
      skills: [skills[1].name, skills[2].name],
    },
    {
      id: crypto.randomUUID(),
      name: "Sally",
      email: "@gmail.com",
      number: "+971553279096",
      role: [role[0].name],
      skills: [skills[1].name, skills[0].name],
    },
    {
      id: crypto.randomUUID(),
      name: "Bins Delgado",
      email: "@gmail.com",
      number: "+971553279096",
      role: [role[0].name, role[2].name],
      skills: [skills[0].name, skills[1].name],
    },
  ];

  const eventFlow1 = [
    {
      id: 1,
      time: "09:00",
      segment: "Segment 1",
      leader: initMembers[0].name,
      elements: ["Microphone", "Stage Light"],
    },
    {
      id: 2,
      time: "09:10",
      segment: "Segment 2",
      leader: initMembers[1].name,
      elements: ["Lyrics Screen", "Guitar"],
    },
  ];

  const eventFlow2 = [
    {
      id: 1,
      time: "10:00",
      segment: "Segment 1",
      leader: initMembers[3].name,
      elements: ["Microphone", "Stage Light"],
    },
    {
      id: 2,
      time: "08:00",
      segment: "Segment 2",
      leader: initMembers[2].name,
      elements: ["Lyrics Screen", "Guitar"],
    },
  ];

  const eventData = [
    {
      id: 1,
      title: "Community Clean-Up",
      date: 7,
      location: "Local Park",
      month: "September",
      year: 2025,
      description:
        "Join us for a day of cleaning up our local park and making it beautiful again!",
      eventFlow: eventFlow1,
      teams: [
        {
          id: crypto.randomUUID(),
          name: "Clean-Up Crew",
          members: [initMembers[0], initMembers[1], initMembers[2]],
        },
        {
          id: crypto.randomUUID(),
          name: "Singing Crew",
          members: [initMembers[1], initMembers[0], initMembers[2]],
        },
      ],
    },
    {
      id: 2,
      title: "Charity Run",
      date: 10,
      location: "City Center",
      month: "September",
      year: 2025,
      description:
        "Participate in our annual charity run to raise funds for local shelters!",
      eventFlow: eventFlow2,
      teams: [
        {
          id: crypto.randomUUID(),
          name: "Singing Crew",
          members: [initMembers[1], initMembers[0], initMembers[2]],
        },
        {
          id: crypto.randomUUID(),
          name: "Clean-Up Crew",
          members: [initMembers[0], initMembers[1], initMembers[2]],
        },
      ],
    },
  ];

  const [members, setMembers] = useState(initMembers);

  function addMember(newMember) {
    setMembers((prev) => [...prev, newMember]);
  }

  function removeMember(memberId) {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  }

  function updateMember(updatedMember) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  }

  const [events, setEvents] = useState(eventData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function updateEvent(updatedEvent) {
    setEvents((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    setSelectedEvent(updatedEvent);
  }

  function addEvent(eventDetails) {
    const newEvent = { id: Date.now(), ...eventDetails };
    setEvents((prev) => [...prev, newEvent]);
  }

  function deleteEvent(eventId) {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        selectedDate,
        selectedEvent,
        addEvent,
        deleteEvent,
        setSelectedDate,
        setSelectedEvent,
        updateEvent,
        members,
        addMember,
        removeMember,
        updateMember,
        memberFilters,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEventsContext = () => useContext(EventsContext);