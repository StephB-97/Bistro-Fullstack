import { useEffect, useRef, useState } from 'react';
import { gallerySlides } from '../data/gallerySlides';

const AUTO_ADVANCE_MS = 4500;

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const total = gallerySlides.length;

  const touchStartX = useRef(0);

  const goTo  = (idx) => setCurrent(((idx % total) + total) % total);
  const next  = () => goTo(current + 1);
  const prev  = () => goTo(current - 1);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50)      next();
    else if (diff < -50) prev();
  };

  return (
    <section id="gallery" className="py-[100px] px-[5%] bg-white">
      <div className="max-w-[1200px] mx-auto">
        <p className="section-tag">📸 Visual Stories</p>
        <h2 className="section-title">Life at <em>Whiskey&apos;s Bistro</em></h2>
        <p className="mt-3 text-base text-bistro-subtle max-w-[560px]">
          A peek into our world — delicious food, happy dogs, and great moments.
        </p>
        <div className="divider" />

        <div
          className="relative rounded-3xl overflow-hidden border-2 border-bistro-blueLite shadow-card"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            {gallerySlides.map((slide, i) => (
              <img
                key={slide.id}
                src={slide.src}
                alt={slide.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                            ${i === current ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                       bg-white/80 border-2 border-bistro-blueLite text-bistro-blue
                       text-lg font-bold cursor-pointer flex items-center justify-center
                       transition-all hover:bg-white hover:scale-110"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                       bg-white/80 border-2 border-bistro-blueLite text-bistro-blue
                       text-lg font-bold cursor-pointer flex items-center justify-center
                       transition-all hover:bg-white hover:scale-110"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {gallerySlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full border-2 border-white transition-all
                            ${i === current
                              ? 'bg-bistro-gold scale-125'
                              : 'bg-white/60 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
