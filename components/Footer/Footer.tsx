import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className={styles.outer}>
      <footer className={styles.footerWrap}>
        <ul>
          <Link href="https://twitter.com/konekone"><li>Twitter</li></Link>
          <Link href="https://www.facebook.com/yusuke.mori.9"><li>Facebook</li></Link>
          <Link href="https://github.com/konekone"><li>GitHub</li></Link>
          <li>Dribbble</li>
        </ul>
        <h1>@2024 Yusuke Mori</h1>
      </footer>
    </div>
  )
}
