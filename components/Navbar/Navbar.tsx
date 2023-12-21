import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-medium">
          TOP
        </Link>
        <button onClick={toggleMenu}>
          <span>☰</span>
        </button>
        {isOpen && (
          <div>
            <ul className="flex items-center text-sm py-4">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:text-sky-900 transition-all duration-300"
                >
                  Qiita
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
