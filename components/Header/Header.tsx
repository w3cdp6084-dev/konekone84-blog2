import React from "react";
import Navbar from "../Navbar/Navbar";
import { useTheme } from '../../contexts/ThemeContext'; // Added import for useTheme

const Header: React.FC = () => {
  const { theme } = useTheme(); // Using the useTheme hook to get the current theme
  return (
    <header className={theme}>
      <Navbar />
    </header>
  );
};

export default Header;