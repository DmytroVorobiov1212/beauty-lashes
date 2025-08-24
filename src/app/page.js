'use client';

import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import Hero from "@/components/Hero/Hero";
import Prices from "@/components/Prices/Prices";
import Services from "@/components/Services/Services";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Prices />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
