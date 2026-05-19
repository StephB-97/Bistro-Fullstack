import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    items,
    isOpen,
    closeCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    checkout,
    orderStatus,
    lastOrder,
    totalPrice,
  } = useCart();

  const onCheckout = () => {
    checkout({ name: 'Guest', email: '', phone: '' });
  };

  return (
    <>
      {/* Dark overlay */}
      <div
        onClick={closeCart}
        aria-hidden={!isOpen}
        className={`fixed inset-0 bg-black/40 z-[1099] transition-opacity duration-300
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Slide-in sidebar */}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 h-screen w-full sm:w-[380px] sm:max-w-[95vw] bg-white
                    z-[1100] flex flex-col font-body
                    shadow-[-4px_0_28px_rgba(46,46,58,0.14)]
                    transition-[right] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{ right: isOpen ? '0' : '-420px' }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4
                            border-b-2 border-bistro-blueLite bg-bistro-bg flex-shrink-0">
          <h2 className="font-display text-lg text-bistro-ink m-0">🛒 Your Cart</h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="bg-transparent border-none text-2xl leading-none cursor-pointer text-bistro-mute
                       transition-all duration-200 hover:text-bistro-gold hover:scale-110 px-1"
          >
            ✕
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Order success banner */}
          {orderStatus === 'success' && (
            <div className="mb-4 p-4 bg-bistro-greenLite border-2 border-bistro-green rounded-xl text-center">
              <span className="text-3xl block mb-1">🎉</span>
              <p className="font-bold text-bistro-green text-sm">Order placed successfully!</p>
              {lastOrder && (
                <p className="text-xs text-bistro-subtle mt-1">
                  Order ID: {lastOrder._id?.slice(-8)}
                </p>
              )}
            </div>
          )}

          {orderStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-center">
              <p className="font-bold text-red-600 text-sm">Failed to place order. Try again.</p>
            </div>
          )}

          {items.length === 0 && orderStatus !== 'success' ? (
            <p className="text-center mt-14 text-bistro-mute text-[0.95rem] leading-[1.7]">
              <span className="text-5xl block mb-2">🐾</span>
              Your cart is empty.
              <br />
              Add something delicious!
            </p>
          ) : (
            <ul className="list-none p-0 m-0">
              {items.map((item) => {
                const subtotal = (item.price * item.qty).toFixed(2);
                return (
                  <li key={item.id} className="py-3.5 border-b border-bistro-blueLite">
                    <div className="flex justify-between items-baseline gap-2 mb-2">
                      <span className="font-bold text-[0.9rem] text-bistro-ink flex-1">
                        {item.name}
                      </span>
                      <span className="font-bold text-[0.9rem] text-bistro-gold whitespace-nowrap">
                        ${subtotal}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-7 h-7 rounded-full border-[1.5px] border-bistro-blue
                                   bg-white text-bistro-blue text-lg font-bold leading-none
                                   cursor-pointer flex items-center justify-center
                                   transition-colors duration-200
                                   hover:bg-bistro-blue hover:text-white"
                      >−</button>

                      <span className="font-bold text-[0.95rem] text-bistro-ink min-w-[22px] text-center">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-7 h-7 rounded-full border-[1.5px] border-bistro-blue
                                   bg-white text-bistro-blue text-lg font-bold leading-none
                                   cursor-pointer flex items-center justify-center
                                   transition-colors duration-200
                                   hover:bg-bistro-blue hover:text-white"
                      >+</button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                        aria-label={`Remove ${item.name} from cart`}
                        className="ml-auto bg-transparent border-none cursor-pointer text-base
                                   opacity-55 transition-all duration-200
                                   hover:opacity-100 hover:scale-125"
                      >🗑️</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-2 border-bistro-blueLite px-6 pt-4 pb-6 bg-bistro-bg flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-base text-bistro-ink">Total</span>
              <span className="font-display text-2xl font-bold text-bistro-gold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 px-3 py-2.5 border-2 border-bistro-gold
                           bg-white text-bistro-gold rounded-full font-body font-bold
                           text-[0.83rem] cursor-pointer
                           transition-colors duration-200 hover:bg-[#FFF5E6]"
              >
                🗑️ Clear Cart
              </button>
              <button
                onClick={onCheckout}
                disabled={orderStatus === 'placing'}
                className={`flex-[2] px-3 py-2.5 rounded-full text-white border-none cursor-pointer
                           bg-gradient-to-br from-bistro-goldLite to-bistro-gold
                           font-body font-bold text-[0.83rem]
                           transition-all duration-200 hover:opacity-90 hover:-translate-y-px shadow-gold
                           ${orderStatus === 'placing' ? 'opacity-60 cursor-wait' : ''}`}
              >
                {orderStatus === 'placing' ? 'Placing order…' : 'Checkout →'}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
