/**
 * Real customer quotes only.
 *
 * This array ships empty on purpose. The Testimonials section does not render
 * at all while it is empty, so the page never shows invented social proof.
 *
 * Fabricated reviews are also a straightforward way to get an ad account
 * restricted — Meta and Google both treat them as misrepresentation — so fill
 * this in with quotes you actually have permission to use, and nothing else.
 *
 * Add entries as:
 *   { quote: '…', name: 'Ananya S.', detail: 'Marketing, Mumbai' }
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Role and city, or anything that makes the person concrete. */
  detail: string;
}

export const TESTIMONIALS: Testimonial[] = [];
