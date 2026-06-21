import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TableOfContents = ({ content }) => {
  const [open, setOpen] = useState(false);

  const headings = useMemo(() => {
    const regex = /^(#{1,3})\s(.+)$/gm;
    const matches = [...content.matchAll(regex)];

    return matches.map((match) => ({
      level: match[1].length,
      text: match[2],
      id: match[2].toLowerCase().replace(/\s+/g, "-"),
    }));
  }, [content]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <aside className="sticky top-24 w-full max-w-sm" data-testid="table-of-contents" aria-labelledby="table-of-contents-heading">
      <nav
        aria-label="Table of Contents"
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between
        bg-white border border-gray-200 shadow-sm
        rounded-xl px-4 py-3 text-sm font-medium
        hover:shadow-md transition"
          data-testid="table-of-contents-toggle"
        >
          <span data-testid="table-of-contents-title" id="table-of-contents-heading">Table of Contents</span>
          {open ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
        </button>


        <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
        ${open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm" data-testid="table-of-contents-content">
          <ul className="space-y-2 text-sm" data-testid="table-of-contents-list">
            {headings.map((h, i) => (
              <li
                key={i}
                onClick={() => scrollTo(h.id)}
                className={`cursor-pointer hover:text-black transition ${
                  h.level === 1
                    ? "font-semibold"
                    : h.level === 2
                    ? "pl-3 text-gray-600"
                    : "pl-6 text-gray-500"
                }`}
              >
                {h.text}
              </li>
            ))}
          </ul>
        </div>
      </div>


        
      </nav>
    </aside>
  );
};

export default TableOfContents;