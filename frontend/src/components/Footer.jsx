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
    <footer className="w-full bg-theme-light py-6 border-t border-gray-200 mt-20"  data-testid="footer"aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6 pb-6" >


        <div className="flex items-center" aria-label="Amanuel's Blog Logo">
          <NavLink to="/" className="font-bold text-xl lg:text-2xl text-gray-900 hover:text-blue-600 transition-colors"
          data-testid="footer-logo" aria-label="Go to homepage">
            Amanuel's Blog
          </NavLink>
        </div>

        <nav aria-label="Footer Navigation" data-testid="footer-navigation"  aria-label="Footer navigation links">
          <ul className="flex flex-row gap-6 md:gap-8 text-base font-medium items-center">
            <li>
              <NavLink to="/" end className={navLinkClass}
              data-testid="footer-home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={navLinkClass}
              data-testid="footer-blogs">
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}
              data-testid="footer-about">
                About
              </NavLink>
            </li>
          </ul>
        </nav>


        <div className="flex items-center gap-4 flex-wrap justify-center"  data-testid="footer-social-links" aria-label="Social media links">

          <a
            href="https://github.com/amanuel1221"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Github"
            aria-label="GitHub profile"
             data-testid="footer-github">

          
            <FaGithub size={20} />
          </a>


          <a
            href="https://linkedin.com/in/amanuel-amare-684234372"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Linkedin"
            aria-label="LinkedIn profile"
            data-testid="footer-linkedin"
          >
            <FaLinkedin size={20} />
          </a>


          <a
            href="mailto:amanuelamare1227@gmail.com"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Email"
            aria-label="Email address"
            data-testid="footer-email"
          >
            <HiMail size={20} />
          </a>


          <a
            href="https://amanuel-portfolio-flame.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            data-testid="Personal Portfolio"
            aria-label="Personal Portfolio"
            data-testid="footer-portfolio"
          >
            <FaBriefcase size={18} />
          </a>


          <NavLink
            to="/contact"
            className="border border-black text-black hover:bg-black hover:text-white font-semibold py-2 px-4 rounded transition-all duration-300 text-sm"
            data-testid="footer-contact"
             aria-label="Go to contact page"
          >
            Contact Me
          </NavLink>
        </div>
      </div>


      <div className="border-t border-gray-200/60 pt-4 text-center text-sm text-gray-500" data-testid="footer-copyright" >
        <p>© {new Date().getFullYear()} Amanuel Amare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;