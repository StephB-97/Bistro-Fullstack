import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  name:   { type: String, required: true },
  price:  { type: Number, required: true },
  qty:    { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    items:      { type: [orderItemSchema], required: true, validate: v => v.length > 0 },
    totalPrice: { type: Number, required: true },
    status:     { type: String, default: 'pending', enum: ['pending', 'confirmed', 'preparing', 'completed', 'cancelled'] },
    customer: {
      name:  { type: String, default: 'Guest' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
