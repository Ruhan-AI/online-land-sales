import type { LandProperty } from "@/types/land";
import cards from "./listings.cards.json";

/**
 * Live inventory imported from the onlinelandsales.com Shopify storefront.
 *
 * Regenerate with:
 *   node scripts/import-listings.mjs
 *
 * Two datasets are emitted:
 *   - `listings.cards.json`     lightweight records for anything that runs in
 *                               the browser (catalog, filters, map, cards)
 *   - `listings.generated.json` full records incl. description, FAQs and the
 *                               Street View embed — server components only,
 *                               loaded via `getFullListing()`
 *
 * Only in-stock land parcels are included; non-land SKUs (gift cards, auction
 * entry fees) are filtered out by the importer. Fields the seller does not
 * publish are omitted rather than filled with placeholder values, so the UI
 * must treat most parcel attributes as optional.
 */
export const PROPERTIES = cards as unknown as LandProperty[];

/** Parcels that currently have a Google Street View 360° tour. */
export const PROPERTIES_WITH_360 = PROPERTIES.filter((p) => p.hasStreetView);

/** Distinct states present in the live inventory, with counts, most stock first. */
export const STATES_IN_INVENTORY = Object.entries(
  PROPERTIES.reduce<Record<string, number>>((acc, p) => {
    acc[p.state] = (acc[p.state] || 0) + 1;
    return acc;
  }, {})
)
  .map(([state, count]) => ({ state, count }))
  .sort((a, b) => b.count - a.count || a.state.localeCompare(b.state));

export function getPropertyByHandle(handle: string): LandProperty | undefined {
  return PROPERTIES.find((p) => p.handle === handle);
}
