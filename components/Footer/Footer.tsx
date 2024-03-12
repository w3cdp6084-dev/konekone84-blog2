import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import { useTheme } from '../../contexts/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  return (
    <div className={`${styles.outer} ${theme}`}>
      <footer className={styles.footerWrap}>
        <ul>
          <Link href="https://twitter.com/konekone"><li>Twitter</li></Link>
          <Link href="https://www.facebook.com/yusuke.mori.9"><li>Facebook</li></Link>
          <Link href="https://github.com/konekone"><li>GitHub</li></Link>
          <li>Dribbble</li>
        </ul>
        <p>@2024 Yusuke Mori</p>
      </footer>
    </div>
  )
}
