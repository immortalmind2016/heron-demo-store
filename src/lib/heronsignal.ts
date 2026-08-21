// Thin typed wrapper over the HeronSignal browser global installed by the
// snippet in index.html.
//
// The tracker script is async, so `window.heronsignal` is briefly undefined
// while the page boots. Every call here is optional-chained and wrapped:
// monitoring must never throw into the store, and a blocked tracker (ad
// blocker, offline) should cost a dropped event, not a broken checkout.
//
// Names mirror the @heronsignal/web package, so moving to it later is an
// import change and nothing else. Do not do both: the events would be
// recorded twice.

type PayloadValue = string | number | boolean | null | undefined;
type Payload = Record<string, PayloadValue>;
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

declare global {
  interface Window {
    heronsignal?: {
      event: (name: string, payload?: Payload) => void;
      log: (level: LogLevel, message: string, data?: Payload) => void;
      captureError: (error: unknown) => void;
    };
    heronsignalConfig?: { publicKey: string };
  }
}

/** A business milestone. Names are stable: funnels and metrics use them verbatim. */
export function event(name: string, payload?: Payload): void {
  try {
    window.heronsignal?.event(name, payload);
  } catch {
    // Instrumentation never breaks the page.
  }
}

/** Context the SDK cannot infer. Attributes become searchable fields in the Logger. */
export function log(level: LogLevel, message: string, data?: Payload): void {
  try {
    window.heronsignal?.log(level, message, data);
  } catch {
    // Instrumentation never breaks the page.
  }
}
