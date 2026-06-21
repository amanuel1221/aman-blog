import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX, HiMoon, HiSun, HiOutlineSearch } from "react-icons/hi";

import SearchModal from "./SearchModal";
import mockPosts from "../store/mockPosts";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [, setLastScrollY] = useState(0);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.theme === "dark"
  );

  const [isSearchOpen, setIsSearchOpen] = useState(false);


useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


   useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

 useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScroll && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScroll = currentScrollY;
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link active text-blue-600 font-semibold"
      : "nav-link text-gray-700 hover:text-blue-600 transition-colors";

  return (
    <>
      <header
        className={`sticky top-0 z-[1000] transition-transform duration-300
      ${showNav ? "translate-y-0" : "-translate-y-full"}
      bg-white text-gray-900`}
       data-testid="navbar-header"
       aria-label="Main site navigation"
      >
        <nav
          className="flex justify-between items-center p-4 lg:px-16"
          aria-label="Primary navigation"
        data-testid="navbar-nav"
        

        >

          <div className="flex items-center">
            <NavLink to="/" className="font-bold lg:text-2xl text-gray-900"
             data-testid="navbar-logo"
              aria-label="Go to homepage">
              Amanuel's Blog
            </NavLink>
          </div>

<div className="flex items-center gap-2 lg:hidden"
datatype="navbar-mobile-search-toggle">
  <button
    onClick={() => setIsSearchOpen(true)}
    className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
    aria-label="Open search"
     data-testid="navbar-mobile-search"
  >
    <HiOutlineSearch className="text-2xl" />
  </button>

  <button
    onClick={() => setDarkMode(!darkMode)}
     data-testid="navbar-mobile-search"
    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
    aria-label="Toggle Dark/Light Mode"
  >
    {darkMode ? (
      <HiSun className="text-yellow-500 w-6 h-6" data-testid="navbar-mobile-toggle-dark-mode-sun" aria-hidden="true"/>
    ) : (
      <HiMoon className="text-gray-800 w-6 h-6" data-testid="navbar-mobile-toggle-dark-mode-moon" aria-hidden="true" />
    )}
  </button>
</div>


          <ul className="hidden lg:flex gap-8 text-lg font-medium items-center"  data-testid="desktop-navs" aria-label="Site pages">
            <li>
              <NavLink to="/" end className={navLinkClass}
              data-testid="desktop-home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs" className={navLinkClass}
              data-testid="desktop-blogs">
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}
              data-testid="desktop-about">
                About
              </NavLink>
            </li>
          </ul>


         <div className="hidden lg:flex items-center gap-6"  data-testid="navbar-desktop-search-toggle">
  <button
    onClick={() => setIsSearchOpen(true)}
    className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
    aria-label="Open search"
    data-testid="desktop-search"
  >
    <HiOutlineSearch className="text-2xl" aria-hidden="true"/>
  </button>

  <button
    onClick={() => setDarkMode(!darkMode)}
    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
    aria-label="Toggle Dark/Light Mode"
    data-testid="desktop-toggle-dark-mode"
    aria-label="Toggle theme"

  >
    {darkMode ? (
      <HiSun className="text-yellow-500 w-6 h-6" data-testid="desktop-toggle-dark-mode-sun" />
    ) : (
      <HiMoon className="text-gray-800 w-6 h-6" data-testid="desktop-toggle-dark-mode-moon" />
    )}
  </button>

  <NavLink
    to="/contact"
    className="hover:bg-black text-black hover:text-white font-bold py-1.5 px-2 rounded transition-colors z-10 border border-black"
    data-testid="desktop-contact"
    aria-label="Contact page"
  >
    Contact Me
  </NavLink>
</div>
          <div className="lg:hidden z-[1010]">
            {!isMenuOpen ? (
              <HiMenu
                data-testid="Open-menu"
                className="text-3xl cursor-pointer text-gray-900"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Menu"
                data-testid="mobile-menu-open"
              />
            ) : (
              <HiX
                data-testid="Close-menu"
                className="text-3xl cursor-pointer text-gray-900"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
                data-testid="mobile-menu-close"
              />
            )}
          </div>
        </nav>


        {isMenuOpen && (
          <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center gap-6 min-h-screen overflow-y-auto animate-in fade-in duration-200 lg:hidden"  aria-label="Mobile navigation menu">

            <ul className="flex flex-col gap-8 text-2xl font-medium items-center w-full"
            data-testid="mobile-navs">

              <li>
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid="mobile-home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blogs"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-blogs"
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-about"
                >
                  About
                </NavLink>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Toggle Dark/Light Mode"
                data-testid="mobile-toggle-dark-mode"
                aria-label="Toggle theme"
                onClick={() => setIsMenuOpen(false)}
              >
                {darkMode ? (
                  <HiSun className="text-yellow-500 w-8 h-8"  data-testid="mobile-toggle-dark-mode-sun" aria-hidden="true"/>
                ) : (
                  <HiMoon className="text-gray-800 w-8 h-8" data-testid="mobile-toggle-dark-mode-moon"  aria-hidden="true"/>
                )}
              </button>

              <NavLink

                to="/contact"
                onClick={() => setIsMenuOpen(false)}

                className=" hover:bg-black text-black hover:text-white font-bold py-1.5 px-2 rounded transition-colors z-10 border border-black "
                data-testid="mobile-contact"

              >

                Contact Me

              </NavLink>
            </div>
          </div>
        )}

      </header>
      <SearchModal
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={mockPosts}
      />
    </>
  );
};


export default NavBar;