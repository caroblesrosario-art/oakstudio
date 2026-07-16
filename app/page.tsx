import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Process from "./components/Process";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
