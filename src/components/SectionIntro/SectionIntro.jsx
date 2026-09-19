export default function SectionIntro({
  title,
  description,
  titleId,
  align = 'left',
}) {
  return (
    <header
      className={`section-intro ${align === 'center' ? 'section-intro--center' : ''}`}
    >
      <h2 id={titleId} className="section-intro__title">
        {title}
      </h2>
      {description ? (
        <p className="section-intro__description">{description}</p>
      ) : null}
    </header>
  );
}
