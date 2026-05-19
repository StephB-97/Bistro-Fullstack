import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_LINKS = [
  { id: 'home',    label: 'Home' },
  { id: 'menu',    label: 'Menu' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'about',   label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQty, toggleCart } = useCart();
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-[72px] z-[1000]
                    bg-bistro-bg/95 backdrop-blur-sm border-b-2 border-bistro-blueLite
                    flex items-center justify-between px-[5%]
                    transition-shadow duration-200
                    ${scrolled ? 'shadow-[0_4px_20px_rgba(91,154,201,0.18)]' : ''}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-2xl bg-bistro-goldLite rounded-full w-10 h-10 flex items-center justify-center">
            🐾
          </span>
          <span className="font-script text-2xl text-bistro-ink">
            <em className="not-italic text-bistro-blue italic">Whiskey&apos;s</em> Bistro
          </span>
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`font-semibold text-sm transition-colors duration-200
                             ${isActive
                                ? 'text-bistro-blue border-b-2 border-bistro-goldLite pb-0.5'
                                : 'text-bistro-subtle hover:text-bistro-blue'}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleCart}
            aria-label="Open shopping cart"
            className="relative bg-transparent border-none cursor-pointer text-2xl px-1 py-1
                       transition-transform duration-200 hover:scale-110 leading-none"
          >
            🛒
            {totalQty > 0 && (
              <span
                className="absolute -top-1.5 -right-2 bg-bistro-gold text-white
                           font-body font-bold text-[0.62rem] min-w-[18px] h-[18px]
                           rounded-full flex items-center justify-center
                           border-2 border-bistro-bg"
              >
                {totalQty}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          >
            <span
              className={`block w-[26px] h-[3px] bg-bistro-ink rounded transition-all duration-300
                          ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-[26px] h-[3px] bg-bistro-ink rounded transition-all duration-300
                          ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-[26px] h-[3px] bg-bistro-ink rounded transition-all duration-300
                          ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden fixed top-[72px] left-0 w-full z-[999]
                     bg-bistro-bg/95 backdrop-blur-sm border-b-2 border-bistro-blueLite
                     flex flex-col py-4 px-[5%] gap-2"
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={closeMobile}
              className={`font-bold text-base text-bistro-ink py-3
                          ${i < NAV_LINKS.length - 1 ? 'border-b border-bistro-blueLite' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
