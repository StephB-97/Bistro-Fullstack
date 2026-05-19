import { Router } from 'express';
import Order from '../models/Order.js';

const router = Router();

// ── GET /api/orders — list all orders ───────────────────────
router.get('/', async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/orders/:id — single order ──────────────────────
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/orders — place a new order ────────────────────
router.post('/', async (req, res) => {
  try {
    const { items, customer } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order = await Order.create({ items, totalPrice, customer });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /api/orders/:id — update order (e.g. status) ───────
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /api/orders/:id — cancel / remove order ──────────
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
