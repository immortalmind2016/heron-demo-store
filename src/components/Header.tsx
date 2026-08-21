import { Link } from 'react-router-dom';
import { useCart } from '../store/cart';

const iconProps = {
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function ShopIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 8h16l-1 12H5L4 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.2 11h10L19 7H6.2" />
    </svg>
  );
}

export default function Header() {
  const { count } = useCart();
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden>
            &#9650;
          </span>
          Fjord Supply Co.
        </Link>
        <nav className="nav">
          <a href="#catalog" className="nav-item">
            <ShopIcon />
            <span>Shop</span>
          </a>
          <a href="#about" className="nav-item">
            <AboutIcon />
            <span>About</span>
          </a>
          <Link to="/checkout" className="nav-item cart-link">
            <CartIcon />
            <span>Cart</span>
            <span className="cart-count" data-empty={count === 0}>
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
