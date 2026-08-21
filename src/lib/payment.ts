// Mock payment "gateway" for the demo store. No real keys, no real charges.
//
// The whole point of this file is that checkout can be broken ON PURPOSE so
// HeronSignal has something real to catch on camera. The failure mode is read
// live from a demo control (localStorage) or a URL param, so you can flip it
// mid-recording without a rebuild:
//
//   none      -> checkout succeeds
//   error     -> an uncaught TypeError is thrown deep in "charge()" (a realistic
//                regression: reading a property off an undefined gateway object).
//                Surfaces as a frontend error + a checkout that never completes.
//   hang      -> the request never resolves: the Pay button spins forever.
//   declined  -> a handled decline ("Your card was declined.").
//
// Trigger it with ?fail=error in the URL, or the hidden demo panel (Shift+D).

export type FailureMode = 'none' | 'error' | 'hang' | 'declined';

const STORAGE_KEY = 'demo:failureMode';
const VALID: FailureMode[] = ['none', 'error', 'hang', 'declined'];

export function getFailureMode(): FailureMode {
  const fromUrl = new URLSearchParams(window.location.search).get('fail');
  if (fromUrl && VALID.includes(fromUrl as FailureMode)) {
    return fromUrl as FailureMode;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && VALID.includes(stored as FailureMode)) {
    return stored as FailureMode;
  }
  return 'none';
}

export function setFailureMode(mode: FailureMode): void {
  window.localStorage.setItem(STORAGE_KEY, mode);
}

export class CardDeclinedError extends Error {
  code = 'card_declined';
  constructor(message = 'Your card was declined.') {
    super(message);
    this.name = 'CardDeclinedError';
  }
}

export type OrderDraft = {
  email: string;
  total: number;
  items: number;
};

export type PaymentResult = {
  ok: true;
  orderId: string;
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// A stand-in for the real gateway SDK. In `error` mode we hand back `undefined`
// to simulate a dependency that failed to initialize, so calling `.charge()`
// throws a genuine TypeError from inside our own code.
type Gateway = { charge: (amount: number) => Promise<{ id: string }> };

function loadGateway(mode: FailureMode): Gateway | undefined {
  if (mode === 'error') return undefined;
  return {
    charge: async (amount: number) => {
      await delay(500);
      return { id: 'ch_' + Math.random().toString(36).slice(2, 10) + '_' + amount };
    },
  };
}

export async function processPayment(order: OrderDraft): Promise<PaymentResult> {
  const mode = getFailureMode();

  // Simulate network latency to the payment API.
  await delay(900);

  if (mode === 'hang') {
    // Never resolves within any recording. The Pay button spins forever and the
    // customer is stuck: exactly the "checkout stops working" scenario.
    await delay(10 * 60 * 1000);
  }

  if (mode === 'declined') {
    throw new CardDeclinedError();
  }

  const gateway = loadGateway(mode);
  // In `error` mode `gateway` is undefined, so this line throws:
  //   TypeError: Cannot read properties of undefined (reading 'charge')
  const charge = await gateway!.charge(order.total);

  return { ok: true, orderId: charge.id.replace('ch_', 'ord_') };
}
