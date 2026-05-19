import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { placeOrder } from '../api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems]   = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // null | 'placing' | 'success' | 'error'
  const [lastOrder, setLastOrder] = useState(null);

  const openCart   = useCallback(() => setIsOpen(true),  []);
  const closeCart  = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addToCart = useCallback((item) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const increaseQty = useCallback((id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // ── Checkout → POST to backend ────────────────────────────
  const checkout = useCallback(async (customerInfo = {}) => {
    if (items.length === 0) return;
    setOrderStatus('placing');
    try {
      const orderItems = items.map((i) => ({
        itemId: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      }));
      const order = await placeOrder({ items: orderItems, customer: customerInfo });
      setLastOrder(order);
      setOrderStatus('success');
      setItems([]);
      // Auto-reset after 5s
      setTimeout(() => setOrderStatus(null), 5000);
    } catch (err) {
      console.error('Checkout error:', err);
      setOrderStatus('error');
      setTimeout(() => setOrderStatus(null), 4000);
    }
  }, [items]);

  const totalQty   = useMemo(() => items.reduce((sum, p) => sum + p.qty, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, p) => sum + p.qty * p.price, 0),
    [items]
  );

  const value = {
    items,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    checkout,
    orderStatus,
    lastOrder,
    totalQty,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
