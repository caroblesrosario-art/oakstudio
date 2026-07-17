import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import Guarantee from "./components/Guarantee";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Services />
      <Work />
      {/* Proof right after the portfolio — renders only when real quotes exist. */}
      <Testimonials />
      <Process />
      <Pricing />
      {/* Risk reversal, right after the price. */}
      <Guarantee />
      <About />
      {/* Last objection-killer before the closing CTA. */}
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
