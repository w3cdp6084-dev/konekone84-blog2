import { gsap } from "gsap";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const topLineRef = useRef(null);
  const middleLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const menuRef = useRef(null); // この行を追加してください
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]); // この行も追加してください

  useEffect(() => {
    if (isOpen) {
      gsap.to(topLineRef.current, { rotation: 45, transformOrigin: "50% 50%", y: 8, duration: 0.5 });
      gsap.to(middleLineRef.current, { opacity: 0, duration: 0.5 });
      gsap.to(bottomLineRef.current, { rotation: -45, transformOrigin: "50% 50%", y: -8, duration: 0.5 });
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.5 }); // メニューを表示
    } else {
      gsap.to(topLineRef.current, { rotation: 0, y: 0, duration: 0.5 });
      gsap.to(middleLineRef.current, { opacity: 1, duration: 0.5 });
      gsap.to(bottomLineRef.current, { rotation: 0, y: 0, duration: 0.5 });
      gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.5 }); // メニューを非表示
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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
  );
};

export default Navbar;
