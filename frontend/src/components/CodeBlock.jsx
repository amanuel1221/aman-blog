import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function CodeBlock({ children, language = "code" }) {
  const [copied, setCopied] = useState(false);

  const code = String(children).replace(/\n$/, "");

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative my-8 group rounded-2xl border border-gray-800 bg-gray-950 shadow-xl overflow-hidden"
    data-testid="code-block">
     
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/60 border-b border-gray-800" 
       data-testid="code-block-header">
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          {language}
        </span>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg
          bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-alias
          text-white active:scale-95"
           data-testid="copy-code-button"
        >
          {copied ? <FaCheck /> : <FaCopy />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

    
      <pre
        className="p-5 text-sm text-gray-100 overflow-x-auto leading-relaxed
        scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        <code className="font-mono">{code}</code>
      </pre>

   
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-purple-500/5 to-cyan-500/5" />
    </div>
  );
}