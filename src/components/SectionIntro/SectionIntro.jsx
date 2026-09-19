export default function SectionIntro({
  eyebrow,
  title,
  description,
  titleId,
  align = 'left',
}) {
  return (
    <header
      className={`section-intro ${align === 'center' ? 'section-intro--center' : ''}`}
    >
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2 id={titleId} className="section-intro__title">
        {title}
      </h2>
      {description ? (
        <p className="section-intro__description">{description}</p>
      ) : null}
    </header>
  );
}
