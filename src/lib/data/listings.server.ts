import type { LandProperty } from "@/types/land";
import full from "./listings.generated.json";

/**
 * Full listing records — description, FAQs, legal text, the Street View embed
 * and the whole photo gallery.
 *
 * SERVER COMPONENTS ONLY. Importing this from a `"use client"` module would
 * ship ~840KB of JSON to the browser; the trimmed card dataset in
 * `properties.ts` exists for that.
 */
export const FULL_LISTINGS = full as unknown as LandProperty[];

export function getFullListing(handle: string): LandProperty | undefined {
  return FULL_LISTINGS.find((p) => p.handle === handle);
}
