import { FaLinkedin, FaTwitter, FaLink, FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function ArticleShare({ title }) {
  const [copied, setCopied] = useState(false);

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-10 mt-16">
      <h3 className="text-lg font-bold mb-5 text-gray-900">
        Share this article
      </h3>

      <div className="flex items-center gap-3 flex-wrap">
      
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            pageUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-xl
          border border-gray-200 bg-white hover:bg-[#0A66C2]
          transition-all duration-300"
          title="Share on LinkedIn"
        >
          <FaLinkedin className="text-gray-700 group-hover:text-white" />
        </a>

      
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-xl
          border border-gray-200 bg-white hover:bg-black
          transition-all duration-300"
          title="Share on X (Twitter)"
        >
          <FaTwitter className="text-gray-700 group-hover:text-white" />
        </a>

        
        <button
          onClick={copyLink}
          className="group flex items-center justify-center w-12 h-12 rounded-xl
          border border-gray-200 bg-white hover:bg-gray-900
          transition-all duration-300 relative"
          title="Copy link"
        >
          {copied ? (
            <FaCheck className="text-green-500" />
          ) : (
            <FaLink className="text-gray-700 group-hover:text-white" />
          )}
        </button>

        
        {copied && (
          <span className="ml-2 text-sm text-green-600 font-medium animate-fade-in">
            Link copied
          </span>
        )}
      </div>
    </div>
  );
}