import { Link } from 'react-router-dom';
import { useCart } from '../store/cart';

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
          <a href="#catalog">Shop</a>
          <a href="#about">About</a>
          <Link to="/checkout" className="cart-link">
            Cart
            <span className="cart-count" data-empty={count === 0}>
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
