export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/hero/hero-mob.webp"
        imagesrcset="
          /hero/hero-mob.webp 375w,
          /hero/hero-mob@2x.webp 750w,
          /hero/hero-tablet.webp 768w,
          /hero/hero-tablet@2x.webp 1356w,
          /hero/hero-desc.webp 1440w,
          /hero/hero-desc@2x.webp 2880w"
        imagesizes="100vw"
        fetchpriority="high"
      />
    </>
  );
}
