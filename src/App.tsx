import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DemoControls from './components/DemoControls';
import Storefront from './pages/Storefront';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      <footer className="site-footer">
        <div className="wrap">
          <span>© Fjord Supply Co.</span>
          <span className="muted">Demo storefront for HeronSignal</span>
        </div>
      </footer>
      <DemoControls />
    </>
  );
}
