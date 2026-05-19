const PILLS = [
  '🌿 Farm-to-Table',
  '🐾 Dog-Certified',
  '♻️ Sustainable',
  '🏆 Award-Winning',
  '🌱 Veg-Friendly',
];

const MOSAIC = [
  { emoji: '🐕', cls: 'bg-gradient-to-br from-bistro-blueSoft to-bistro-blueLite mt-8' },
  { emoji: '🍽️', cls: 'bg-gradient-to-br from-bistro-goldLite to-bistro-cream2' },
  { emoji: '🌿', cls: 'bg-gradient-to-br from-bistro-tan to-[#FEF4E8]' },
  { emoji: '❤️', cls: 'bg-gradient-to-br from-bistro-blue to-bistro-blueSoft -mt-8' },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-[100px] px-[5%] bg-gradient-to-br from-[#EBF4FD] to-bistro-bg"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            {MOSAIC.map((m, i) => (
              <div
                key={i}
                className={`rounded-3xl aspect-square flex items-center justify-center
                            text-[3.5rem] shadow-card ${m.cls}`}
              >
                {m.emoji}
              </div>
            ))}
          </div>

          <div>
            <p className="section-tag">🐾 Our Story</p>
            <h2 className="section-title">
              Born from <em>Love</em> for Dogs &amp; Food
            </h2>
            <div className="divider" />

            <p className="text-bistro-subtle leading-[1.8]">
              In 2018, Stephanie Bernades opened Whiskey&apos;s Bistro with one
              simple dream: a place where her beloved Yorkshire Terrier,
              Whiskey, could sit beside her at the dinner table — and so could yours.
            </p>

            <h3 className="font-display text-lg text-bistro-ink mt-6 mb-2">🌱 Our Philosophy</h3>
            <p className="text-bistro-subtle leading-[1.8]">
              Every dish is crafted from locally-sourced, seasonal ingredients.
              We partner with local farms to guarantee freshness.
            </p>

            <h3 className="font-display text-lg text-bistro-ink mt-6 mb-2">🐶 A Space for Every Pup</h3>
            <p className="text-bistro-subtle leading-[1.8]">
              Our dog-friendly garden patio features water stations, shaded rest
              spots, and a dedicated Pup Menu designed by our in-house canine
              nutritionist. Every dog receives a complimentary welcome low fat
              biscuit on arrival.
            </p>

            <h3 className="font-display text-lg text-bistro-ink mt-6 mb-2">🏆 Awards &amp; Recognition</h3>
            <p className="text-bistro-subtle leading-[1.8]">
              Named &quot;Most Dog-Friendly Restaurant&quot; by City Dining
              Magazine three years running. We&apos;ve proudly hosted over
              3,000 dogs and counting!
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6">
              {PILLS.map((p) => (
                <span
                  key={p}
                  className="bg-white border-2 border-bistro-blueLite rounded-full
                             px-4 py-1.5 text-[0.85rem] font-bold text-bistro-blue"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
