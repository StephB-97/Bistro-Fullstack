// Base URL — uses Vite proxy in dev, relative path in production
const API = import.meta.env.VITE_API_URL || '/api';

// ── Menu endpoints ──────────────────────────────────────────
export const fetchMenuItems = async () => {
  const res = await fetch(`${API}/menu`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
};

export const createMenuItem = async (item) => {
  const res = await fetch(`${API}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to create menu item');
  return res.json();
};

export const updateMenuItem = async (id, updates) => {
  const res = await fetch(`${API}/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update menu item');
  return res.json();
};

export const deleteMenuItem = async (id) => {
  const res = await fetch(`${API}/menu/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete menu item');
  return res.json();
};

// ── Order endpoints ─────────────────────────────────────────
export const placeOrder = async (orderData) => {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to place order');
  return res.json();
};

export const fetchOrders = async () => {
  const res = await fetch(`${API}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

export const updateOrder = async (id, updates) => {
  const res = await fetch(`${API}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update order');
  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${API}/orders/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete order');
  return res.json();
};
