import styles from '../styles/About.module.scss';
import { motion } from 'framer-motion';

const About: React.FC = () => {
 const pageTransition = {
   initial: { opacity: 0 },
   animate: { opacity: 1 },
   exit: { opacity: 0 },
   transition: { duration: 0.5 }
 };

 return (
   <motion.div
     initial="initial"
     animate="animate"
     exit="exit"
     variants={pageTransition}
     transition={{ duration: 0.5 }}
     className={styles.aboutContainer}
   >
    <h1>About Me</h1>
    <div>
      <h2>Yusuke Mori</h2>
      <p>
        デザイナー・ソフトウェアエンジニアとして活動してます。<br />
        このブログでは、日々の学びや技術的なことを書いています。
        ハンドルネームは<span>konekone😺</span>です。
      </p>
      <div>
        <h3>Links:</h3>
        <a href="https://twitter.com/konekone_">X(twitter)</a>
        <a href="https://www.facebook.com/yusuke.mori.568">Facebook</a>
        <a href="https://github.com/konekone">GitHub</a>
        <a href="https://dribbble.com/konekone">Dribbble</a>
      </div>
      
      <div>
        <h3>carrier:</h3>
        <ol>
          <li>2013年4月 〜 2017年3月: 高専卒業</li>
          <li>2017年4月 〜 2019年3月: 大学院修士課程修了</li>
          <li>2019年4月 〜 2021年3月: ソフトウェアエンジニアとして勤務</li>
        </ol>
      </div>
      
      <div>
        <h3>Skills:</h3>
        <ul>
          <li>UIデザイン</li>
          <li>UXリサーチ</li>
          <li>ブランディング</li>
        </ul>
        <ul>
          <li>HTML/CSS/JavaScript</li>
          <li>React/Next.js</li>
          <li>Vue/Nuxt.js</li>
        </ul>
      </div>
    </div>
   </motion.div>
 );
}

export default About;