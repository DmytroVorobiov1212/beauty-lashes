'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FiInstagram } from 'react-icons/fi';
import s from './Team.module.css';

// ⚠️ Якщо маєш фото — поклади у /public/team/ і впиши шлях у photo
const PEOPLE = [
  {
    name: 'Natalia',
    instagram:
      'https://www.instagram.com/nv_studio_tabor?igsh=eno3dHNzYnNtZGI4',
    photo: null, // '/team/natalia.jpg'
  },
  {
    name: 'Anzhelika',
    instagram: 'https://www.instagram.com/rasy_tabor?igsh=a2JsM21hd2dhc3pm',
    photo: null, // '/team/anzhelika.jpg'
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

        <div className={s.grid}>
          {PEOPLE.map(({ name, instagram, photo }) => (
            <article key={name} className={s.card}>
              <div className={s.avatarWrap} aria-hidden="true">
                {photo ? (
                  <Image
                    src={photo}
                    alt=""
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
                  <FiInstagram aria-hidden="true" />
                  <span>{handleFromUrl(instagram)}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
