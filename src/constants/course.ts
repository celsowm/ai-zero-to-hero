/**
 * DESIGN_SCALE_MULTIPLIER
 *
 * A constant multiplier (1.4) applied to all base font sizes to establish the
 * visual design baseline. This is separate from the user-adjustable `fontScale`
 * from UIContext (default 1.0, range 0.8–1.4).
 *
 * All font-size calculations follow the formula:
 *   `size * DESIGN_SCALE_MULTIPLIER * fontScale`
 *
 * To change the default visual "size" of all text, adjust this value.
 * To let users control their own zoom, use the fontScale context API.
 */
export const DESIGN_SCALE_MULTIPLIER = 1.4;
