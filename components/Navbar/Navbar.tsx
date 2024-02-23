import Link from "next/link";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5 });
    } else {
      gsap.to(menuRef.current, { x: "-100%", duration: 0.5 });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div id="menuToggle">
        <input type="checkbox" onClick={toggleMenu} checked={isOpen} />
        <span></span>
        <span></span>
        <ul ref={menuRef} id="menu">
          <Link href="/"><li>Home</li></Link>
          <Link href="/about"><li>About</li></Link>
          <Link href="/contact"><li>Contact</li></Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
