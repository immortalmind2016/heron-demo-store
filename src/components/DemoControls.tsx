import { useEffect, useState } from 'react';
import {
  getFailureMode,
  setFailureMode,
  type FailureMode,
} from '../lib/payment';

// Hidden operator panel for recording the demo. Toggle with Shift+D so it never
// shows up in the shot unless you want it. Lets you flip checkout between
// working and its failure modes live, without a rebuild.
const MODES: { mode: FailureMode; label: string; hint: string }[] = [
  { mode: 'none', label: 'Working', hint: 'Checkout succeeds' },
  { mode: 'error', label: 'Uncaught error', hint: 'Throws, never completes' },
  { mode: 'hang', label: 'Infinite spinner', hint: 'Request never resolves' },
  { mode: 'declined', label: 'Card declined', hint: 'Handled decline' },
];

export default function DemoControls() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<FailureMode>(getFailureMode());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!open) return null;

  const choose = (m: FailureMode) => {
    setFailureMode(m);
    setMode(m);
  };

  return (
    <div className="demo-panel" role="dialog" aria-label="Demo controls">
      <div className="demo-panel-head">
        <strong>Demo controls</strong>
        <button onClick={() => setOpen(false)} aria-label="Close">
          &times;
        </button>
      </div>
      <p className="demo-panel-sub">Checkout behaviour (Shift+D to toggle)</p>
      <div className="demo-modes">
        {MODES.map((m) => (
          <button
            key={m.mode}
            className="demo-mode"
            data-active={mode === m.mode}
            onClick={() => choose(m.mode)}
          >
            <span>{m.label}</span>
            <small>{m.hint}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
