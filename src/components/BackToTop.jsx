import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-7 right-7 w-12 h-12 rounded-full
                 bg-gradient-to-br from-bistro-goldLite to-bistro-gold text-white
                 text-xl font-bold border-none cursor-pointer
                 shadow-[0_6px_20px_rgba(200,147,58,0.5)] z-[800]
                 flex items-center justify-center
                 transition-transform duration-200 hover:-translate-y-1"
    >
      ↑
    </button>
  );
}
