'use client';

import { useTranslations } from 'next-intl';
import s from './Hero.module.css';
import CallMenu from '../CallMenu/CallMenu';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.9,
      bounce: 0.2,
      staggerChildren: 0.1,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="hero" className={s.section}>
      <div className="container">
        <motion.div
          className={s.inner}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h1 className={s.title} variants={item}>
            {t('title')}
          </motion.h1>
          <motion.p className={s.subtitle} variants={item}>
            {t('subtitle')}
          </motion.p>
          <motion.div variants={item}>
            <CallMenu
              label={t('cta')}
              className={s.cta}
              phones={[
                { label: 'Natalia', number: '+420775616298' },
                { label: 'Anzhelika', number: '+420721460816' },
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
