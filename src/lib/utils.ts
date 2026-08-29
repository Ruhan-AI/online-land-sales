import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shown wherever the source listing simply doesn't publish a value. */
export const UNKNOWN = "—";

/**
 * Neutral placeholder for the handful of listings with no photo.
 * Inline SVG so it costs no request and never 404s.
 */
export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#F4EFE5"/>
      <path d="M0 430l190-150 150 118 165-198 295 230v170H0z" fill="#D9E2EC"/>
      <path d="M0 470l240-120 210 150 350-110v210H0z" fill="#B9C6D4"/>
      <circle cx="638" cy="132" r="46" fill="#EBF1F8"/>
      <text x="400" y="560" text-anchor="middle" font-family="system-ui,sans-serif"
        font-size="26" fill="#64748B">Photo coming soon</text>
    </svg>`.replace(/\s+/g, " ")
  );

/** Always returns something an <Image src> will accept. */
export function imageOf(src?: string | null): string {
  return src && src.length > 0 ? src : IMAGE_PLACEHOLDER;
}

/**
 * Formats a currency amount. Imported listings legitimately lack some figures,
 * so a nullish amount renders as an em-dash rather than a misleading "$0".
 */
export function formatMoney(
  amount: number | null | undefined,
  showCents = false
): string {
  if (amount == null || !Number.isFinite(amount)) return UNKNOWN;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(amount);
}

export function formatAcres(acres: number | null | undefined): string {
  if (acres == null || !Number.isFinite(acres)) return UNKNOWN;
  if (acres < 1) {
    return `${acres.toFixed(2)} Acres`;
  }
  return acres % 1 === 0 ? `${acres} Acres` : `${acres.toFixed(2)} Acres`;
}

export function formatSqFt(acres: number | null | undefined): string {
  if (acres == null || !Number.isFinite(acres)) return UNKNOWN;
  const sqft = Math.round(acres * 43560);
  return `${sqft.toLocaleString()} sq. ft.`;
}

export function calculateMonthlyPayment(
  principal: number,
  annualInterestRate: number,
  months: number
): number {
  if (annualInterestRate === 0) {
    return principal / months;
  }
  const monthlyRate = annualInterestRate / 100 / 12;
  const payment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment);
}

export function getStatusBadge(status: string): { label: string; color: string; bg: string } {
  switch (status) {
    case "available":
      return { label: "Available", color: "text-brand-forest", bg: "bg-brand-forest-light border-brand-forest/20" };
    case "reserved":
      return { label: "Under Contract", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
    case "sold":
      return { label: "Sold", color: "text-slate-600", bg: "bg-slate-100 border-slate-300" };
    case "auction":
      return { label: "Live Auction", color: "text-brand-clay", bg: "bg-brand-clay-light border-brand-clay/30" };
    default:
      return { label: "Available", color: "text-brand-forest", bg: "bg-brand-forest-light border-brand-forest/20" };
  }
}

export function getRoadAccessLabel(access: string | undefined): string {
  switch (access) {
    case "paved":
      return "Paved Road Access";
    case "gravel":
      return "Maintained Gravel";
    case "dirt":
      return "Direct Dirt Road";
    case "4wd":
      return "4WD / High Clearance";
    case "unpaved_county":
      return "County Maintained Dirt";
    case "deeded_easement":
      return "Deeded Legal Easement";
    default:
      return "Road Access";
  }
}

export function getUtilitySummary(
  utilities?: { power?: string; water?: string; sewer?: string } | null
): string[] {
  if (!utilities) return [];
  const list: string[] = [];
  if (utilities.power === "available_at_street") list.push("Power at Street");
  else if (utilities.power === "solar_recommended") list.push("Ideal Solar");
  else if (utilities.power === "nearby") list.push("Power Nearby");

  if (utilities.water === "city_tap_available") list.push("City Water");
  else if (utilities.water === "well_needed") list.push("Well Permitted");
  else if (utilities.water === "water_haul_tank") list.push("Water Haul / Tank");

  if (utilities.sewer === "city_sewer") list.push("Public Sewer");
  else if (utilities.sewer === "septic_needed") list.push("Septic Approved");

  return list;
}
