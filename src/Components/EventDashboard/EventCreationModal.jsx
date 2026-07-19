import { useState, useEffect } from "react";
import ConsoleDebug from "../ConsoleDebug";
import { useEventsContext } from "../../Context/EventDataContext";
import Modal from "../Utils/Modal";
import { useAddEvent } from "../../hooks/useEvents";

const inputClass =
  "w-full border border-inkwell/15 bg-white rounded-md p-2 mb-3 text-inkwell placeholder:text-inkwell/40 focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass";

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

      <h2 className="font-display text-xl font-semibold text-inkwell mb-1">New Event</h2>
      {selectedDate && (
        <h3 className="font-mono text-sm text-inkwell/60 mb-4">
          {selectedDate.toDateString()}
        </h3>
      )}

      <input
        type="text"
        placeholder="Event Title"
        className={inputClass}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        className={inputClass}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className={inputClass}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-4 py-2 text-inkwell/70 hover:bg-inkwell/10 rounded-md text-sm font-medium transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-brass hover:bg-brass-light text-inkwell rounded-md text-sm font-semibold transition-colors"
          onClick={handleSave}
        >
          Create Event
        </button>
      </div>

    </Modal>
  );
};

export default EventCreationModal;
