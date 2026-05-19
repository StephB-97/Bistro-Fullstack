const NAVIGATE = ['Home', 'Menu', 'Gallery', 'About', 'Contact'];
const MENU_LINKS = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Pup Menu'];
const HOURS = [
  { day: 'Mon – Thu',   time: '8am – 9pm' },
  { day: 'Friday',      time: '8am – 10pm' },
  { day: 'Saturday',    time: '8am – 10pm' },
  { day: 'Sunday',      time: '8am – 8pm' },
  { day: 'Public Hols', time: '10am – 7pm' },
];
const SOCIAL = [
  { emoji: '📘', title: 'Facebook' },
  { emoji: '📸', title: 'Instagram' },
  { emoji: '🎵', title: 'TikTok' },
  { emoji: '🐦', title: 'Twitter' },
  { emoji: '📌', title: 'Pinterest' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-bistro-ink to-[#1A1A2E] text-white px-[5%] pt-[60px] pb-[30px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div>
            <span className="text-[1.8rem] bg-bistro-goldLite rounded-full
                             w-12 h-12 mb-4 flex items-center justify-center">
              🐾
            </span>
            <h3 className="font-script text-[1.6rem] text-bistro-goldLite">Whiskey&apos;s Bistro</h3>
            <p className="text-sm text-white/60 mt-2 leading-[1.7]">
              Where tails wag and flavours dance. A dog-friendly bistro
              crafted with love for you and your four-legged companions.
            </p>
            <div className="flex gap-2.5 mt-5">
              {SOCIAL.map((s) => (
                <span
                  key={s.title}
                  title={s.title}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                             text-base cursor-pointer transition-colors hover:bg-bistro-gold"
                >
                  {s.emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.08em] text-bistro-goldLite mb-4">
              Navigate
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {NAVIGATE.map((n) => (
                <li key={n}>
                  <a
                    href={`#${n.toLowerCase()}`}
                    className="text-sm text-white/60 hover:text-bistro-goldLite transition-colors"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.08em] text-bistro-goldLite mb-4">
              Menu
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {MENU_LINKS.map((m) => (
                <li key={m}>
                  <a href="#menu" className="text-sm text-white/60 hover:text-bistro-goldLite transition-colors">
                    {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.08em] text-bistro-goldLite mb-4">
              Hours
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {HOURS.map((h) => (
                <li key={h.day} className="text-sm text-white/60">
                  <span className="font-semibold text-white/80">{h.day}</span>{' '}
                  {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-[0.78rem] text-white/40 gap-2">
          <span>&copy; {new Date().getFullYear()} Whiskey&apos;s Bistro. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
