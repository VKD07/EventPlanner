import React, { useEffect } from "react";
import ConsoleDebug from "../ConsoleDebug";

const Modal = ({ isOpen, onClose, children }) => {
  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // close if you click backdrop
    >
      <ConsoleDebug componentName="Modal" />
      {/* Modal box */}
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()} // stop click from closing when inside
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
