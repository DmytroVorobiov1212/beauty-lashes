'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FiArrowUpRight, FiInstagram } from 'react-icons/fi';
import { m } from 'framer-motion';

import SectionIntro from '@/components/SectionIntro/SectionIntro';
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

function handleFromUrl(url) {
  try {
    const parsed = new URL(url);
    const part = parsed.pathname.split('/').filter(Boolean).pop();
    return part ? `@${part}` : 'Instagram';
  } catch {
    return 'Instagram';
  }
}

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
        <SectionIntro
          title={t('title')}
          description={t('subtitle')}
          titleId="team-title"
        />

        <m.div
          className={s.grid}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
        >
          {PEOPLE.map(({ name, instagram, photo }) => (
            <m.article
              key={name}
              className={s.card}
              variants={cardVariants}
            >
              <div className={s.photoWrap}>
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="(max-width: 767px) 44vw, 320px"
                  className={s.photo}
                />
                <div className={s.photoShade} aria-hidden="true" />
              </div>

              <div className={s.body}>
                <div className={s.identity}>
                  <h3 className={s.name}>{name}</h3>
                  <span className={s.handle}>{handleFromUrl(instagram)}</span>
                </div>

                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={s.instagram}
                  aria-label={`${name} — Instagram`}
                >
                  <span className={s.instagramText}>
                    <FiInstagram aria-hidden="true" />
                    Instagram
                  </span>
                  <FiArrowUpRight aria-hidden="true" className={s.arrow} />
                </a>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
