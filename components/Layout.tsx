import React from "react";
import Header from "./Header/Header";
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle/ThemeToggle';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme}>
      <Header />
      <ThemeToggle /> 
      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;