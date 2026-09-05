import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Focus from '../components/Focus';
import Work from '../components/Work';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="page-shell">
      <Navbar />
      <Hero />
      <Focus />
      <Work />
      <About />
      <Footer />
    </main>
  );
}
