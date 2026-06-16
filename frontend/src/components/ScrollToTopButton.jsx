import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollTop}
  className="fixed bottom-8 right-8 z-50 px-4 py-3 rounded-full
bg-gray-900 text-white shadow-xl
hover:bg-gray-800 hover:scale-105 transition-all cursor-pointer"
      data-testid="scroll-to-top-button"  
    >
      <FaArrowUp />
    </button>
  );
}