import { useState } from "react";
import { FaBookOpen, FaTimes } from "react-icons/fa";

export default function ReadingMode({ onToggle }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const next = !enabled;
    setEnabled(next);
    onToggle(next);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-pressed={enabled}
      aria-label={
        enabled
          ? "Disable reading mode"
          : "Enable reading mode"
      }
 className="
fixed bottom-24 right-8 z-50
px-4 py-3 rounded-full
bg-black text-white
shadow-xl
hover:scale-105
transition-all duration-300
flex items-center gap-2
"
      data-testid="reading-mode-toggle"
    >
      {enabled ? <FaTimes aria-hidden="true"/> : <FaBookOpen aria-hidden="true"/>}

      <span className="text-sm font-medium"
      data-testid="reading-mode-toggle-text">
        {enabled ? "Exit Reading" : "Reading Mode"}
      </span>
       <span className="sr-only">
        Toggle distraction-free reading mode
      </span>
    </button>
  );
}