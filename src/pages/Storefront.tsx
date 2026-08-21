import { useState } from 'react';
import { products, formatUsd, type Product } from '../data/products';
import { useCart } from '../store/cart';
import ProductArt from '../components/ProductArt';

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const onAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="card">
      <div className="card-media" style={{ background: product.tone }}>
        {imgFailed ? (
          <ProductArt id={product.id} />
        ) : (
          <img
            className="card-photo"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        <span className="card-price">{formatUsd(product.price)}</span>
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.blurb}</p>
        <button
          className={`btn btn-add${added ? ' is-added' : ''}`}
          onClick={onAdd}
        >
          {added ? 'Added to cart ✓' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}

export default function Storefront() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Everyday goods, quietly made</p>
          <h1>
            Calm objects for
            <br />
            the daily ritual.
          </h1>
          <p className="lede">
            A small catalogue of well-made things. No noise, no clutter, just
            pieces built to last and get out of the way.
          </p>
          <a href="#catalog" className="btn btn-solid">
            Shop the catalogue
          </a>
        </div>
      </section>

      <section id="catalog" className="wrap catalog">
        <div className="section-head">
          <h2>The catalogue</h2>
          <span className="muted">{products.length} items</span>
        </div>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section id="about" className="wrap about">
        <h2>Made to be forgotten</h2>
        <p className="lede">
          The best tools disappear into the work. We keep the range small so we
          can keep the quality high, and we ship worldwide.
        </p>
      </section>
    </main>
  );
}
