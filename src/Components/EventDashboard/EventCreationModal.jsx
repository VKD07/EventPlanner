import React, { useState, useEffect } from "react";
import ConsoleDebug from "../ConsoleDebug";
import { useEventsContext } from "../../Context/EventDataContext";
import Modal from "../Utils/Modal";
import { useAddEvent } from "../../hooks/useEvents";

const EventCreationModal = ({ isOpen, onClose }) => {
  
  const { selectedDate } = useEventsContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const eventDate = selectedDate?.toISOString().split("T")[0]

  const addAnEvent = useAddEvent();

  //TODO: Use react forms for this
  // Reset form each time modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setLocation("");
      setDescription("");
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!title.trim()) return;
    addAnEvent.mutate({
      title,
      eventDate, 
      location,
      description
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ConsoleDebug componentName="EventCreationModal" />

      <h2 className="text-xl font-bold mb-1">Create Event</h2>
      {selectedDate && (
        <h3 className="mb-2">
          Date: {selectedDate.toDateString()}
        </h3>
      )}

      <input
        type="text"
        placeholder="Event Title"
        className="w-full border rounded p-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        className="w-full border rounded p-2 mb-3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full border rounded p-2 mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-amber-500 text-white rounded"
          onClick={handleSave}
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default EventCreationModal;
