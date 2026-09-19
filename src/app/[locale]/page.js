import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import Gallery from '@/components/Gallery/Gallery';
import Hero from '@/components/Hero/Hero';
import Offerings from '@/components/Offerings/Offerings';
import Team from '@/components/Team/Team';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main>
        <Hero />
        <Offerings />
        <Gallery />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
