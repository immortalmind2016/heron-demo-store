# Fjord Supply Co. — HeronSignal demo store

A small, believable storefront (catalogue → cart → checkout → payment →
confirmation) built to exercise **HeronSignal** monitoring in a demo/trailer.
Payments are mocked (no real keys, nothing is charged), and checkout can be
**broken on purpose** so HeronSignal has a genuine incident to catch on camera.

Vite + React + TypeScript, plain CSS, no backend.

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:5173.

## HeronSignal

Installed. The tracking snippet sits in [`index.html`](index.html) with the
public key `pk_jrvvh4TXU6-c6VbjpqYMlY-Z50auIYv8`, which is what feeds RUM,
frontend error tracking, session replay, and anomaly detection with no further
code.

On top of that the store reports its own journey through
[`src/lib/heronsignal.ts`](src/lib/heronsignal.ts):

| Event | Fires |
| ----- | ----- |
| `cart_item_added` | Add to cart on the catalogue |
| `checkout_started` | Pay is submitted |
| `checkout_completed` | Payment succeeded, before the confirmation redirect |
| `checkout_payment_failed` | Payment threw, with `reason` `card_declined` or `unexpected_error` |

Plus a `warn` log on a handled decline and an `error` log on the broken
checkout, carrying the active failure mode.

Nothing is recorded until the origin you serve from is allowed in the
workspace, so add `http://localhost:5173` (and any deployed host) under
Domains first, or every event is dropped at ingestion.

## Breaking checkout for the demo

The checkout failure mode is read live, so you can flip it mid-recording with no
rebuild. Two ways to set it:

- **Hidden operator panel:** press **Shift+D** to toggle a small panel (it never
  shows in the shot otherwise), then pick a mode.
- **URL param:** append `?fail=error` (or `hang`, `declined`) to any URL.

| Mode       | What the customer sees                    | What HeronSignal catches                        |
| ---------- | ----------------------------------------- | ----------------------------------------------- |
| `none`     | Checkout succeeds                         | A healthy conversion / business event           |
| `error`    | "Something went wrong" and no order       | An uncaught `TypeError` from the pay handler     |
| `hang`     | Pay button spins forever                  | A checkout that never completes (stuck sessions) |
| `declined` | "Your card was declined" (handled)        | A handled decline, not an outage                 |

The star of the demo is `error`: the mock gateway fails to initialize, so
`gateway.charge()` throws a real `TypeError`, which is surfaced out-of-band to
`window.onerror` (and therefore HeronSignal) while the customer is left with a
broken checkout and no idea why.

## Suggested trailer flow

1. Browse the catalogue, add items, go to checkout (looks like a normal store).
2. Off camera, set mode to `error` (Shift+D).
3. Hit **Pay** — checkout breaks. "Nobody tells you."
4. Cut to HeronSignal: the error, the session replay, the anomaly alert.
