import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import MenuItem from './models/MenuItem.js';

const menuItems = [
  {
    itemId: 'chicken-salad',
    name: 'Chicken Salad Bowl',
    desc: 'Grilled Chicken, Persian Cucumbers, Quinoa, Romaine Lettuce & Humus',
    price: 14.5,
    category: 'starters',
    image: 'Img/chickenSalad.png',
    gradient: 'from-bistro-blueLite to-bistro-blueSoft',
    badge: { label: '🌱 Low Calorie', tone: 'green' },
  },
  {
    itemId: 'potato-soup',
    name: 'Baked Potato Bacon Soup',
    desc: 'Velvety baked potato soup with crispy bacon and chives',
    price: 20.0,
    category: 'starters',
    image: 'Img/soup.png',
    gradient: 'from-bistro-cream2 to-bistro-goldLite',
    badge: { label: '🔥 Popular', tone: 'gold' },
  },
  {
    itemId: 'truffle-fries',
    name: 'Truffle Parmesan Fries',
    desc: 'Crispy fries tossed in truffle oil and parmesan cheese',
    price: 20.0,
    category: 'starters',
    image: 'Img/fries.png',
    gradient: 'from-bistro-tan to-[#FEF4E8]',
    badge: { label: "Chef's Pick", tone: 'blue' },
  },
  {
    itemId: 'salmon',
    name: 'Pan-Seared Salmon',
    desc: 'Atlantic salmon, lemon-caper butter, asparagus & herbed potato mash',
    price: 35.0,
    category: 'mains',
    image: 'Img/salmon.png',
    gradient: 'from-bistro-blueSoft to-bistro-blue',
    badge: { label: '🔥 Popular', tone: 'gold' },
  },
  {
    itemId: 'ribeye',
    name: 'Yorkie Ribeye Steak',
    desc: '300g grass-fed ribeye, garlic smashed potatoes, carrots & broccoli',
    price: 42.0,
    category: 'mains',
    image: 'Img/steak.png',
    gradient: 'from-bistro-gold to-bistro-goldLite',
    badge: { label: '🔥 Signature', tone: 'gold' },
  },
  {
    itemId: 'risotto',
    name: 'Wild Mushroom Risotto',
    desc: 'Creamy arborio with wild mushrooms, truffle oil, Parmesan & fresh herbs',
    price: 22.5,
    category: 'mains',
    image: 'Img/risotto.png',
    gradient: 'from-bistro-greenLite to-[#A0DBA0]',
    badge: { label: '🌱 Vegetarian', tone: 'green' },
  },
  {
    itemId: 'roasted-chicken',
    name: 'Herb-Roasted Chicken',
    desc: 'Free-range whole chicken, rosemary jus, roasted tomatoes & creamy potatoes',
    price: 35.0,
    category: 'mains',
    image: 'Img/roastedChicken.png',
    gradient: 'from-bistro-blueLite to-bistro-blue',
    badge: { label: 'Family Fav', tone: 'blue' },
  },
  {
    itemId: 'flan',
    name: 'Caramel Flan',
    desc: 'Caramel custard with a torched caramel crust',
    price: 18.0,
    category: 'desserts',
    image: 'Img/flan.png',
    gradient: 'from-bistro-cream2 to-bistro-gold',
    badge: { label: '🔥 Crowd Fav', tone: 'gold' },
  },
  {
    itemId: 'blueberry-tart',
    name: 'Blueberry Tart',
    desc: 'Buttery pastry shell, fresh blueberries & mint',
    price: 11.0,
    category: 'desserts',
    image: 'Img/blueberry.png',
    gradient: 'from-bistro-blueLite to-bistro-blueSoft',
    badge: { label: 'Seasonal', tone: 'blue' },
  },
  {
    itemId: 'chai',
    name: 'Hot Chai Latte',
    desc: 'Spiced Chai, oat milk, vanilla & foam art',
    price: 6.5,
    category: 'drinks',
    image: 'Img/chai.png',
    gradient: 'from-bistro-blueSoft to-bistro-blueLite',
    badge: { label: '🔥 Signature', tone: 'gold' },
  },
  {
    itemId: 'spritz',
    name: 'Honey & Ginger Spritz',
    desc: 'Sparkling water, ginger, wildflower honey syrup, mint & lemon',
    price: 8.0,
    category: 'drinks',
    image: 'Img/spritz.png',
    gradient: 'from-bistro-goldLite to-bistro-cream2',
    badge: { label: '🌱 Non-Alc', tone: 'green' },
  },
  {
    itemId: 'dog-cookies',
    name: 'Dog Low Fat Cookies',
    desc: 'House-baked peanut butter & pumpkin dog biscuits — vet approved!',
    price: 5.0,
    category: 'pup',
    image: 'Img/dogTreat.png',
    gradient: 'from-bistro-cream2 to-bistro-tan',
    badge: { label: '🐾 Pup Fav', tone: 'gold' },
  },
  {
    itemId: 'pup-bowl',
    name: 'Pup Bowl Supreme',
    desc: 'Steamed chicken, brown rice, carrots & green beans — balanced & safe',
    price: 8.0,
    category: 'pup',
    image: 'Img/dogBowl.png',
    gradient: 'from-bistro-blueLite to-bistro-blueSoft',
    badge: { label: '🐾 Dog Menu', tone: 'blue' },
  },
];

const seed = async () => {
  await connectDB();
  console.log('🗑️  Clearing existing menu items…');
  await MenuItem.deleteMany({});
  console.log('🌱 Seeding menu items…');
  await MenuItem.insertMany(menuItems);
  console.log(`✅ Seeded ${menuItems.length} menu items!`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
