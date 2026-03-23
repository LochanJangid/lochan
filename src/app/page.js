import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Work from "../components/Work";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <main className="bg-[#070708] text-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}