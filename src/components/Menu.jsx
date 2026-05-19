import { useEffect, useMemo, useState } from 'react';
import { fetchMenuItems } from '../api';
import { menuCategories } from '../data/menuItems';
import { useCart } from '../context/CartContext';

const BADGE_TONES = {
  blue:  'bg-bistro-blueLite text-bistro-blue',
  gold:  'bg-[#FFE8C0] text-bistro-gold',
  green: 'bg-bistro-greenLite text-bistro-green',
};

export default function Menu() {
  const [filter, setFilter] = useState('all');
  const [flashIds, setFlashIds] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Fetch menu items from API on mount
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuItems();
        // Map _id and itemId for compatibility
        const mapped = data.map((item) => ({
          ...item,
          id: item.itemId || item._id,
        }));
        setMenuItems(mapped);
      } catch (err) {
        console.error('Failed to load menu:', err);
        setError('Could not load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  const visibleItems = useMemo(() => {
    return filter === 'all' ? menuItems : menuItems.filter((it) => it.category === filter);
  }, [filter, menuItems]);

  const handleAdd = (item) => {
    addToCart(item);
    setFlashIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setFlashIds((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    }, 900);
  };

  return (
    <section
      id="menu"
      className="py-[100px] px-[5%] bg-gradient-to-b from-bistro-bg to-[#EBF4FD]"
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="section-tag">Our Offerings</p>
        <h2 className="section-title">
          A Menu With <em>Quality</em> Taste
        </h2>
        <p className="mt-3 text-base text-bistro-subtle max-w-[560px]">
          Farm-to-table dishes crafted daily — including a special Pup Menu!
        </p>
        <div className="divider" />

        {/* Filter buttons */}
        <div className="flex gap-2.5 flex-wrap mb-10">
          {menuCategories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`font-body font-bold text-sm px-5 py-2 rounded-full border-2
                            transition-colors duration-200
                            ${isActive
                              ? 'bg-bistro-blue border-bistro-blue text-white'
                              : 'bg-white border-bistro-blueLite text-bistro-subtle hover:bg-bistro-blueSoft hover:border-bistro-blueSoft hover:text-white'}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Loading / Error states */}
        {loading && (
          <div className="text-center py-16">
            <span className="text-4xl animate-spin inline-block">🐾</span>
            <p className="mt-4 text-bistro-subtle font-semibold">Fetching the menu…</p>
          </div>
        )}
        {error && (
          <div className="text-center py-16">
            <p className="text-bistro-danger font-semibold">{error}</p>
          </div>
        )}

        {/* Card grid */}
        {!loading && !error && (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {visibleItems.map((item) => {
              const flashing = flashIds[item.id];
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border-2 border-bistro-blueLite
                             overflow-hidden shadow-card hover:shadow-cardHi
                             transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image area */}
                  <div
                    className={`relative h-[180px] bg-gradient-to-br ${item.gradient}
                                flex items-center justify-center overflow-hidden`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="max-h-[85%] max-w-[85%] object-contain drop-shadow-lg
                                 transition-transform duration-500 group-hover:scale-110"
                    />
                    {item.badge?.label && (
                      <span
                        className={`absolute top-3 right-3 text-[0.7rem] font-bold
                                    px-2.5 py-1 rounded-full ${BADGE_TONES[item.badge.tone] || BADGE_TONES.blue}`}
                      >
                        {item.badge.label}
                      </span>
                    )}
                  </div>

                  {/* Text + button */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-[1.1rem] text-bistro-ink mb-1">{item.name}</h3>
                    <p className="text-[0.82rem] text-bistro-subtle leading-[1.6] mb-4 flex-1">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-display text-xl font-bold text-bistro-gold">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAdd(item)}
                        className={`font-body font-bold text-[0.78rem] px-4 py-2 rounded-full
                                    border-2 transition-all duration-200
                                    ${flashing
                                      ? 'bg-bistro-green border-bistro-green text-white scale-105'
                                      : 'bg-white border-bistro-blue text-bistro-blue hover:bg-bistro-blue hover:text-white'}`}
                      >
                        {flashing ? '✓ Added!' : '+ Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
