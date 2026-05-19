import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true, unique: true },
    name:     { type: String, required: true },
    desc:     { type: String, required: true },
    price:    { type: Number, required: true },
    category: { type: String, required: true, enum: ['starters', 'mains', 'desserts', 'drinks', 'pup'] },
    image:    { type: String, required: true },
    gradient: { type: String, default: '' },
    badge: {
      label: { type: String, default: '' },
      tone:  { type: String, default: 'blue', enum: ['blue', 'gold', 'green'] },
    },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
