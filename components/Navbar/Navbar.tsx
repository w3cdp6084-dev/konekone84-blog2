import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { x: '0%', duration: 0.5 });
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.5 });
    }
  }, [isOpen]);

  return (
    <nav>
      <div>
        <Link href="/">
          TOP
        </Link>
        <button onClick={toggleMenu}>
          <span>☰</span>
        </button>
        <div ref={menuRef} style={{ x: '100%', position: 'fixed', top: 0, right: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: 'all 0.5s ease' }}>
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
      </div>
    </nav>
  );
};

export default Navbar;
