import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/cart';
import { formatUsd } from '../data/products';
import { processPayment, CardDeclinedError } from '../lib/payment';

const SHIPPING = 6;

export default function Checkout() {
  const { lines, subtotal, count, setQty, clear } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal > 0 ? subtotal + SHIPPING : 0;

  if (count === 0) {
    return (
      <main className="wrap checkout">
        <div className="empty">
          <h1>Your cart is empty</h1>
          <p className="muted">Add a few things and come back.</p>
          <Link to="/" className="btn btn-solid">
            Back to the shop
          </Link>
        </div>
      </main>
    );
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await processPayment({ email, total, items: count });
      clear();
      navigate('/confirmation', {
        state: { orderId: result.orderId, total, email },
      });
    } catch (err) {
      if (err instanceof CardDeclinedError) {
        // Handled decline: show it cleanly, nothing is "broken".
        setError(err.message);
      } else {
        // Unexpected failure. Show a broken-checkout state to the customer AND
        // surface the real error out-of-band so window.onerror / HeronSignal
        // captures the stack. This is the moment the demo is about.
        setError('Something went wrong processing your payment. Please try again.');
        window.setTimeout(() => {
          throw err;
        });
      }
    } finally {
      // Note: in "infinite spinner" mode processPayment never resolves, so this
      // never runs and the button spins forever, by design.
      setLoading(false);
    }
  };

  return (
    <main className="wrap checkout">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={onSubmit}>
          <fieldset>
            <legend>Contact</legend>
            <label>
              Email
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Shipping</legend>
            <div className="field-row">
              <label>
                First name
                <input required placeholder="Alex" defaultValue="Alex" />
              </label>
              <label>
                Last name
                <input required placeholder="Morgan" defaultValue="Morgan" />
              </label>
            </div>
            <label>
              Address
              <input required placeholder="12 Harbour Lane" defaultValue="12 Harbour Lane" />
            </label>
            <div className="field-row">
              <label>
                City
                <input required placeholder="Bergen" defaultValue="Bergen" />
              </label>
              <label>
                Postal code
                <input required placeholder="5003" defaultValue="5003" />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <div className="card-field">
              <label>
                Card number
                <input
                  inputMode="numeric"
                  required
                  placeholder="4242 4242 4242 4242"
                  defaultValue="4242 4242 4242 4242"
                />
              </label>
              <div className="field-row">
                <label>
                  Expiry
                  <input required placeholder="MM / YY" defaultValue="04 / 27" />
                </label>
                <label>
                  CVC
                  <input required placeholder="123" defaultValue="123" />
                </label>
              </div>
            </div>
            <p className="mock-note">
              Demo store, mock payments. No card is charged.
            </p>
          </fieldset>

          {error && (
            <div className="pay-error" role="alert">
              {error}
            </div>
          )}

          <button className="btn btn-solid btn-pay" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner" aria-label="Processing" />
            ) : (
              <>Pay {formatUsd(total)}</>
            )}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order</h2>
          <ul className="summary-lines">
            {lines.map((l) => (
              <li key={l.product.id}>
                <span className="sum-name">
                  {l.product.name}
                  <span className="qty">
                    <button
                      type="button"
                      onClick={() => setQty(l.product.id, l.qty - 1)}
                      aria-label="Decrease"
                    >
                      &minus;
                    </button>
                    {l.qty}
                    <button
                      type="button"
                      onClick={() => setQty(l.product.id, l.qty + 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </span>
                </span>
                <span>{formatUsd(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-totals">
            <div>
              <span>Subtotal</span>
              <span>{formatUsd(subtotal)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{formatUsd(SHIPPING)}</span>
            </div>
            <div className="grand">
              <span>Total</span>
              <span>{formatUsd(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
