import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaBriefcase } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => {
 
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link active text-blue-600 font-semibold"
      : "nav-link text-gray-700 hover:text-blue-600 transition-colors duration-300";

  return (
    <footer className="w-full bg-theme-light py-6 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6 pb-6">
        
       
        <div className="flex items-center" aria-label="Amanuel's Blog Logo">
          <NavLink to="/" className="font-bold text-xl lg:text-2xl text-gray-900 hover:text-blue-600 transition-colors">
            Amanuel's Blog
          </NavLink>
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex flex-row gap-6 md:gap-8 text-base font-medium items-center">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={navLinkClass}>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>

       
        <div className="flex items-center gap-4 flex-wrap justify-center">
        
          <a
            href="https://github.com/amanuel1221"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Github"
            aria-label="GitHub profile"
          >
            <FaGithub size={20} />
          </a>
               
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/amanuel-amare-684234372" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Linkedin"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin size={20} />
          </a>
          
         
          <a
            href="mailto:amanuelamare1227@gmail.com"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Email"
            aria-label="Email address"
          >
            <HiMail size={20} />
          </a>

          
          <a
            href="https://your-portfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Personal Portfolio"
            aria-label="Personal Portfolio"
          >
            <FaBriefcase size={18} />
          </a>

        
          <NavLink
            to="/contact"
            className="border border-black text-black hover:bg-black hover:text-white font-semibold py-2 px-4 rounded transition-all duration-300 text-sm"
          >
            Contact Me
          </NavLink>
        </div>
      </div>

    
      <div className="border-t border-gray-200/60 pt-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Amanuel Amare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;