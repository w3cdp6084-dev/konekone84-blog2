import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle/ThemeToggle';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme}>
      <ThemeToggle />
      <div className="wrap">
        <Header />
        <main className="main">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;