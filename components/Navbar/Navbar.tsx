import { gsap } from "gsap";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const topLineRef = useRef(null);
  const middleLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.5 });
      gsap.fromTo(menuRef.current, 
        { height: 0 }, 
        { height: 'auto', duration: 0.5, ease: 'power2.out' }
      );
      gsap.to(topLineRef.current, { rotation: 45, transformOrigin: "50% 50%", y: 8, duration: 0.5 });
      gsap.to(middleLineRef.current, { opacity: 0, duration: 0.5 });
      gsap.to(bottomLineRef.current, { rotation: -45, transformOrigin: "50% 50%", y: -8, duration: 0.5 });
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.5 });
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.5 });
      gsap.to(menuRef.current,
        { height: 0, duration: 0.5, ease: 'power2.in' }
      );
      gsap.to(topLineRef.current, { rotation: 0, y: 0, duration: 0.5 });
      gsap.to(middleLineRef.current, { opacity: 1, duration: 0.5 });
      gsap.to(bottomLineRef.current, { rotation: 0, y: 0, duration: 0.5 });
      gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.5 });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div ref={overlayRef} className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      <nav className={styles.navbar}>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span ref={topLineRef}></span>
          <span ref={middleLineRef}></span>
          <span ref={bottomLineRef}></span>
        </div>
        <ul ref={menuRef} className={styles.menu}>
          {["/", "/about", "/contact"].map((path, index) => (
            <li key={path} ref={el => menuItemsRef.current[index] = el}>
              <Link href={path}>{path.replace("/", "") || "Home"}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
