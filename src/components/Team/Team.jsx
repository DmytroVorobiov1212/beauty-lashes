'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';
import s from './Team.module.css';

const PEOPLE = [
  {
    name: 'Natalia',
    instagram:
      'https://www.instagram.com/nv_studio_tabor?igsh=eno3dHNzYnNtZGI4',
    photo: '/team/natalia.webp',
  },
  {
    name: 'Anzhelika',
    instagram: 'https://www.instagram.com/rasy_tabor?igsh=a2JsM21hd2dhc3pm',
    photo: '/team/anzhelika.webp',
  },
];

function initials(name) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function handleFromUrl(url) {
  try {
    const u = new URL(url);
    const part = u.pathname.split('/').filter(Boolean).pop();
    return part ? `@${part}` : 'Instagram';
  } catch {
    return 'Instagram';
  }
}

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96, filter: 'blur(2px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Team() {
  const t = useTranslations('Team');
  return (
    <section
      id="team"
      className={`section ${s.section}`}
      aria-labelledby="team-title"
    >
      <div className="container">
        <h2 id="team-title" className={s.title}>
          {t('title')}
        </h2>
        <p className={s.subtitle}>{t('subtitle')}</p>

        <motion.div
          className={s.grid}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PEOPLE.map(({ name, instagram, photo }) => (
            <motion.article
              key={name}
              className={s.card}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              <div className={s.avatarWrap} aria-hidden="true">
                {photo ? (
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="160px"
                    className={s.avatarImg}
                    priority={false}
                  />
                ) : (
                  <div className={s.avatarFallback}>{initials(name)}</div>
                )}
              </div>

              <div className={s.info}>
                <h3 className={s.name}>{name}</h3>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={s.ig}
                  aria-label={`${name} — Instagram`}
                >
                  <FiInstagram aria-hidden="true" className={s.igIco} />
                  <span className={s.handle}>{handleFromUrl(instagram)}</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
