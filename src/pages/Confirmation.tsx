import { Link, useLocation } from 'react-router-dom';
import { formatUsd } from '../data/products';

type ConfirmationState = {
  orderId?: string;
  total?: number;
  email?: string;
};

export default function Confirmation() {
  const { state } = useLocation();
  const { orderId, total, email } = (state ?? {}) as ConfirmationState;

  return (
    <main className="wrap confirmation">
      <div className="confirm-card">
        <div className="check" aria-hidden>
          ✓
        </div>
        <h1>Order confirmed</h1>
        <p className="lede">
          Thanks{email ? `, ${email}` : ''}. Your order is on its way.
        </p>
        <dl className="confirm-meta">
          <div>
            <dt>Order</dt>
            <dd>{orderId ?? '—'}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{typeof total === 'number' ? formatUsd(total) : '—'}</dd>
          </div>
        </dl>
        <Link to="/" className="btn btn-solid">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
