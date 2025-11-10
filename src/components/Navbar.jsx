import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-2xl font-bold">
          <Link to="/">Contact Manager</Link>
        </h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white"
        >
          <FaBars size={22} />
        </button>

        <ul
          className={`sm:flex sm:space-x-6 absolute sm:static bg-blue-600 w-full sm:w-auto left-0 sm:left-auto transition-all duration-300 ${
            menuOpen ? "top-14 opacity-100" : "top-[-200px] opacity-0 sm:opacity-100"
          }`}
        >
          <li className="p-3 sm:p-0 text-center hover:bg-blue-700 sm:hover:bg-transparent">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="p-3 sm:p-0 text-center hover:bg-blue-700 sm:hover:bg-transparent">
            <Link to="/create-contact" onClick={() => setMenuOpen(false)}>Create Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
