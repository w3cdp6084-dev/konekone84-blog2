import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div>
        <Link href="/">
          TOP
        </Link>
        <button onClick={toggleMenu}>
          <span>☰</span>
        </button>
        {isOpen && (
          <div>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#">
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
