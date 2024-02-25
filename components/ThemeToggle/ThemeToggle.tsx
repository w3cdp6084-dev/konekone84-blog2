// components/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const switchVariants = {
  night: { x: 20 },
  day: { x: 0 },
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} style={{
      width: '50px',
      height: '25px',
      borderRadius: '50px',
      backgroundColor: theme === 'light' ? '#ccc' : 'red',
      cursor: 'pointer',
      position: 'relative',
    }}>
      <motion.div 
        variants={switchVariants}
        animate={theme === 'light' ? 'day' : 'night'}
        style={{
          position: 'absolute',
          top: '2.5px',
          left: '2.5px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
        }}
      />
    </div>
  );
};

export default ThemeToggle;
