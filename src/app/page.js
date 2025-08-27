'use client';

import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Gallery from "@/components/Gallery/Gallery";
import Hero from "@/components/Hero/Hero";
import Offerings from "@/components/Offerings/Offerings";
import Prices from "@/components/Prices/Prices";
import Services from "@/components/Services/Services";
import Team from "@/components/Team/Team";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        {/* <Services /> */}
        {/* <Prices /> */}
        <Offerings />
        <Gallery />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
