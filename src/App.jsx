import { CartProvider } from './context/CartContext';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import Menu       from './components/Menu';
import Gallery    from './components/Gallery';
import About      from './components/About';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import Cart       from './components/Cart';
import BackToTop  from './components/BackToTop';

export default function App() {
  return (
    <CartProvider>
      <Navbar />

      <main>
        <Hero />
        <Menu />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer />

      <Cart />
      <BackToTop />
    </CartProvider>
  );
}
