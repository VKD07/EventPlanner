import { useEffect } from "react";
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
      className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center z-[60]"
      onClick={onClose} // close if you click backdrop
    >
      <ConsoleDebug componentName="Modal" />
      {/* Modal box */}
      <div
        className="bg-paper rounded-lg shadow-2xl border-t-4 border-brass p-6 w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()} // stop click from closing when inside
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-inkwell/50 hover:text-inkwell hover:bg-inkwell/10 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
