const STATS = [
  { number: '4.9 ⭐', label: 'Rating' },
  { number: '250+',   label: 'Happy Pups' },
  { number: '48',     label: 'Dishes' },
  { number: '7 yrs',  label: 'Open' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen pt-[72px] flex items-center justify-center
                 bg-gradient-to-br from-bistro-bg via-[#EBF4FD] to-bistro-cream"
    >
      <div
        className="max-w-[1200px] w-full px-[5%] py-8
                   grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <span
            className="inline-block bg-bistro-blueLite border border-bistro-blueSoft
                       rounded-full px-4 py-1.5 text-[0.82rem] font-bold
                       text-bistro-blue mb-5"
          >
            🐾 Pet friendly Bistro since 2018
          </span>

          <h1
            className="font-display leading-[1.15] text-bistro-ink"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            <em className="not-italic italic text-bistro-gold">Whiskey&apos;s</em>
            <br />
            <span className="text-bistro-blue">Bistro</span>
          </h1>

          <p className="mt-5 text-[1.05rem] text-bistro-subtle leading-[1.75] max-w-[460px] mx-auto lg:mx-0">
            A cosy bistro crafted for food lovers and their four-legged
            companions. Farm-fresh cuisine, dog-friendly patios, and a
            dedicated Pup Menu that will make your furry friend enjoy with you.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap justify-center lg:justify-start">
            <a href="#menu" className="btn-gold">🍽️ See Our Menu</a>
            <a href="#contact" className="btn-blue">📍 Reserve a Table</a>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
          <div
            className="bg-white rounded-3xl border-2 border-bistro-blueLite
                       px-12 py-8 text-center shadow-hero"
          >
            <div
              className="animate-wiggle"
              style={{ fontSize: 'clamp(5rem, 10vw, 8rem)' }}
            >
              🐕
            </div>
            <p className="font-script text-[1.4rem] text-bistro-gold mt-2">
              Bring your furry friend!
            </p>
          </div>

          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white border-2 border-bistro-blueLite rounded-2xl
                           px-3 sm:px-5 py-3 sm:py-3.5 text-center min-w-[70px] sm:min-w-[85px] shadow-card"
              >
                <div className="font-display text-lg sm:text-2xl font-bold text-bistro-blue">
                  {s.number}
                </div>
                <div className="text-[0.75rem] text-bistro-mute font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
