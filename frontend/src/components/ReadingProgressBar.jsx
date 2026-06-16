import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = (scrollTop / docHeight) * 100;
      setProgress(percent);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[100] w-full h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        shadow-[0_0_10px_rgba(99,102,241,0.6)] transition-all duration-150"
        style={{ width: `${progress}%` }}
        data-testid="reading-progress-bar"
      />
    </div>
  );
}