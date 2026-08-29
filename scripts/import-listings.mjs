/**
 * Imports the live onlinelandsales.com Shopify catalog into the site's data layer.
 *
 *   node scripts/import-listings.mjs            # fetch live + write data file
 *   node scripts/import-listings.mjs --dry      # report only, write nothing
 *   node scripts/import-listings.mjs --in FILE  # use a saved products dump
 *
 * Design rule: every field written here must trace back to something the seller
 * actually published. Where the source has no value we leave the field
 * undefined so the UI can hide it — we never substitute a plausible-looking
 * placeholder (no invented APNs, tax figures, county phone numbers or
 * boundary polygons).
 */
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_FILE = resolve(ROOT, "src/lib/data/listings.generated.json");
const CARDS_FILE = resolve(ROOT, "src/lib/data/listings.cards.json");

const STORE = "https://store.onlinelandsales.com";
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const inIdx = args.indexOf("--in");
const IN_FILE = inIdx !== -1 ? args[inIdx + 1] : null;

/* ------------------------------------------------------------------ *
 * State lookup
 * ------------------------------------------------------------------ */
const STATES = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY",
};
const CODE_TO_STATE = Object.fromEntries(
  Object.entries(STATES).map(([name, code]) => [
    code,
    name.replace(/\b\w/g, (c) => c.toUpperCase()),
  ])
);

/* ------------------------------------------------------------------ *
 * Non-land utility SKUs sold through the same store
 * ------------------------------------------------------------------ */
const NON_LAND =
  /^(?:\s*\d{4,}\s*-\s*)?(?:Onlinelandsales Auction|Joining Auction|Purchase Discount|LandCoin Gift Card|Monthly\d+|Auto Kit|googleapps|Sea Base )/i;

/**
 * Staging copies the seller left published (handle or title prefixed "test").
 * They duplicate real parcels and must not appear in a public catalog.
 */
const TEST_LISTING = /^test[-\s]/i;

/** Marketing noise that prefixes some titles. */
const TITLE_PREFIX =
  /^(?:\s*\d{4,}\s*-\s*)?(?:test\s+)?(?:bid4assets\s+(?:auction\s+id\s*#?:?\s*|auction\s+)?\d*\s*-\s*)?/i;

/* ------------------------------------------------------------------ *
 * HTML → text
 * ------------------------------------------------------------------ */
function stripHtml(html) {
  return (html || "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<link[^>]*>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|li|h[1-6]|section)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/gi, '"')
    .replace(/&frac12;/gi, "\u00bd")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

const decodeAttr = (s) => s.replace(/&amp;/g, "&");
const num = (s) => (s == null ? undefined : Number(String(s).replace(/,/g, "")));

/* ------------------------------------------------------------------ *
 * Field extractors (regexes validated against the live catalog)
 * ------------------------------------------------------------------ */
/**
 * The store uses two body templates. Template A labels things
 * "Sales Price / Monthly Payments / TAXES / ROADS"; template B uses
 * "Total Property Price / Monthly Payment / Property Taxes / Road Access" and
 * additionally publishes APN, GPS and City. Every regex below accepts both.
 */
const RE = {
  // Leading-dot decimals matter: ".50 Acre" is 0.50, not 50.
  acresTitle: /(\d+(?:\.\d+)?|\.\d+)\s*(?:\+\/-\s*)?\bAcres?\b/i,
  acresBody: /\bSize\s*:\s*(\d+(?:\.\d+)?|\.\d+)\s*(?:\+\/-\s*)?Acres?/i,
  monthlyTitle: /\$\s?([\d,]+)\s*\/\s*(?:Month|Mo\b)/i,
  monthlyBody: /Monthly\s*Payments?\s*:\s*\$?\s*(\d[\d,]*(?:\.\d+)?)/i,
  // Must require the colon AND a leading digit, or it matches the boilerplate
  // sentence "Simply make the small down payment, and...".
  downBody: /Down\s*Payment\s*:\s*\$?\s*(\d[\d,]*(?:\.\d+)?)/i,
  downIsBid: /Down\s*Payment\s*:\s*(?:Winning|Current)\s*Bid/i,
  salesPrice:
    /(?:Sales?\s*Price|Total\s*Property\s*Price)\s*:\s*\$?\s*(\d[\d,]*(?:\.\d+)?)/i,
  interest: /Interest\s*Rate\s*:\s*(\d+(?:\.\d+)?)\s*%/i,
  termMonths:
    /(?:Estimated\s*Loan\s*Term|Loan\s*Term)\s*:?\s*(?:Approximately\s*)?(\d+)\s*months?/i,
  earlyPayoff: /(\d+)%\s*DISCOUNT ON REMAINING BALANCE/i,
  zoning: /\bZONING\s*:\s*([^\n]{1,80})/i,
  utilities: /\bUtilities\s*:\s*([^\n]{1,120})/i,
  taxes:
    /(?:Property\s*)?TAXES?\s*:\s*\$?\s*([\d,]+(?:\.\d+)?)\s*(?:a|per)?\s*year/i,
  roads: /\b(?:ROADS?|Road\s*Access)\s*:\s*([^\n]{1,80})/i,
  apn: /\bAPN\s*:\s*([A-Za-z0-9][A-Za-z0-9.\-\/]{3,40})/i,
  gps: /\bGPS\s*:\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/i,
  city: /\bCity\s*:\s*([A-Za-z][A-Za-z .'-]{1,40})/i,
  entrance: /Entrance to Subdivision\s*:?\s*\n?([^\n]{3,120})/i,
  nearTown: /^Near\s+([A-Z][A-Za-z .'-]{2,40})\s*$/m,
  legal:
    /(A tract of land[^\n]{20,600}|The (?:North|South|East|West)[^\n]{20,400}|Lot\s+\d+[^\n]{0,200}(?:Block|Unit)[^\n]{0,200})/i,
  iframe: /<iframe[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi,
  svShape: /!6m\d+!1m\d+!1s[^!]+!2m2!1d[-\d.]+!2d[-\d.]+!3f/,
  svParts:
    /!1s([^!]+)!2m2!1d(-?[\d.]+)!2d(-?[\d.]+)!3f(-?[\d.]+)!4f(-?[\d.]+)(?:!5f([\d.]+))?/,
  mapLatLng: /!2d(-?[\d.]+)!3d(-?[\d.]+)/,
};

/** Title head: "State, County, rest" — state may be a full name or 2-letter code. */
function parseHead(rawTitle) {
  const title = rawTitle.replace(TITLE_PREFIX, "").trim();
  const m = title.match(/^([A-Za-z][A-Za-z ]{1,24}?)\s*,\s*([A-Za-z][A-Za-z .'-]*?)(?:\s+Count(?:y|ies))?\s*,\s*([\s\S]*)$/i);
  if (!m) return null;

  const rawState = m[1].trim();
  const key = rawState.toLowerCase();
  let state, stateCode;
  if (STATES[key]) {
    stateCode = STATES[key];
    state = rawState.replace(/\b\w/g, (c) => c.toUpperCase());
  } else if (CODE_TO_STATE[rawState.toUpperCase()]) {
    stateCode = rawState.toUpperCase();
    state = CODE_TO_STATE[stateCode];
  } else {
    return null;
  }

  const county = m[2].trim().replace(/\s+/g, " ");
  return { state, stateCode, county: `${county} County`, rest: m[3].trim(), cleanTitle: title };
}

/**
 * Everything before the terms tail is the human description of the lot.
 * The tail is not consistently punctuated — it can appear as ". TERMS $62/Month",
 * " TERMS $62/Month", " Special 8% TERMS ...", ". Cash Deal." or " - CASH SALE".
 */
const TERMS_TAIL =
  /\s*[.,-]?\s*(?:(?:SPECIAL\s+)?\d+%\s+)?TERMS?\b|\s*[.,-]?\s*CASH\s+(?:SALE|DEAL)|\s*[.,-]?\s*\$\s?[\d,]+\s*\/\s*(?:Month|Mo\b)/i;

function parseSubdivision(rest) {
  const cut = rest.split(TERMS_TAIL)[0] || rest;
  return cut
    .replace(RE.acresTitle, "")
    .replace(/^[\s.,-]+|[\s.,()-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractEmbeds(bodyHtml) {
  const out = { streetView: null, mapLat: null, mapLng: null, videoUrl: null };
  RE.iframe.lastIndex = 0;
  let m;
  while ((m = RE.iframe.exec(bodyHtml || "")) !== null) {
    const src = decodeAttr(m[1]);

    if (!out.videoUrl && /youtube\.com|youtu\.be|vimeo\.com/.test(src)) {
      out.videoUrl = src;
    }
    if (!/google\.com\/maps\/embed/.test(src)) continue;

    if (RE.svShape.test(src)) {
      if (out.streetView) continue;
      const g = src.match(RE.svParts);
      if (!g) continue;
      const lat = Number(g[2]);
      const lng = Number(g[3]);
      // Reject anything outside the continental US + AK/HI envelope
      if (!(lat > 18 && lat < 72 && lng > -170 && lng < -66)) continue;
      out.streetView = {
        panoId: g[1],
        lat,
        lng,
        heading: Number(g[4]),
        pitch: Number(g[5]),
        fov: g[6] ? Number(g[6]) : undefined,
        embedUrl: src,
      };
    } else if (out.mapLat == null) {
      const g = src.match(RE.mapLatLng);
      if (g) {
        const lng = Number(g[1]);
        const lat = Number(g[2]);
        if (lat > 18 && lat < 72 && lng > -170 && lng < -66) {
          out.mapLat = lat;
          out.mapLng = lng;
        }
      }
    }
  }
  return out;
}

function extractFaqs(text) {
  const faqs = [];
  const re = /Q:\s*([^\n]{5,200})\s*\n\s*A:\s*([^\n]{5,900})/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    faqs.push({ question: m[1].trim(), answer: m[2].trim() });
  }
  return faqs;
}

/**
 * Lines that must never reach the description. The header block repeats an
 * older copy of the listing title, and on some lots that copy quotes a *stale*
 * monthly price that contradicts the authoritative structured terms — so any
 * line that restates terms is dropped rather than shown to a buyer.
 */
const DESCRIPTION_BLOCKLIST = [
  /^near\s+[a-z][\w .'-]*\s*(,|$)/i,
  /\bTERMS?\b/,
  /\$\s?[\d,]+\s*\/\s*(month|mo\b)/i,
  /^\s*\d+\s*\/\s*\d+\s*$/, // slideshow counters "1 / 6"
  /^[❮❯←→<>\s-]*$/,
  /see all .* lots/i,
  /10 reasons to buy/i,
  /checkout bills/i,
  /^-->$/,
];

/**
 * Pulls the seller's own prose: everything between the "Financing:" boilerplate
 * and the FAQ block, preferring the "Location and Legal Description" narrative.
 */
function extractDescription(text) {
  const usable = (l) =>
    l.length > 45 && !DESCRIPTION_BLOCKLIST.some((re) => re.test(l));

  // Preferred: the narrative under "Location and Legal Description"
  const locBlock = (text.split(/Location and Legal Description/i)[1] || "")
    .split(/\bQ:\s/)[0]
    .split("\n")
    .map((l) => l.trim())
    .filter(usable);

  if (locBlock.length) return locBlock.join(" ").slice(0, 1400).trim();

  // Fallback: prose before the financing boilerplate
  const intro = (text.split(/\bFinancing\s*:/i)[0] || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(usable);

  return intro.join(" ").slice(0, 1400).trim();
}

/** A short, factual summary built only from structured fields. */
function buildSummary({ acres, subdivision, county, state, zoning, utilSummary }) {
  const lead = [];
  if (acres != null) lead.push(`${acres} acre${acres === 1 ? "" : "s"}`);
  if (subdivision) lead.push(`in ${subdivision.replace(/\s*[.,]\s*$/, "")}`);

  // Join the lot phrase and the place with a comma, not a space.
  let s = lead.length
    ? `${lead.join(" ")}, ${county}, ${state}.`
    : `${county}, ${state}.`;

  if (zoning && !/^(n\/a|none)$/i.test(zoning.trim())) s += ` Zoned ${zoning}.`;
  if (utilSummary && !/^(none|no)\.?$/i.test(utilSummary.trim())) {
    s += ` Utilities: ${utilSummary.replace(/\.$/, "")}.`;
  }
  return s.replace(/\s{2,}/g, " ").replace(/,\s*,/g, ",").trim();
}

/** Map the free-text "Utilities:" line onto our enum, conservatively. */
function mapUtilities(summary) {
  if (!summary) return undefined;
  const s = summary.toLowerCase();
  const u = { summary: summary.trim() };
  if (/\bnone\b|^no$|^no\b/.test(s)) {
    u.power = "solar_recommended";
    u.water = "well_needed";
    u.sewer = "septic_needed";
  } else {
    if (/electric|power/.test(s)) {
      u.power = /at (the )?(road|street|lot)|in subdivision|available/.test(s)
        ? "available_at_street"
        : "nearby";
    }
    if (/water/.test(s)) {
      u.water = /city|community|public|paved/.test(s) ? "city_tap_available" : "well_needed";
    }
    if (/sewer/.test(s)) u.sewer = "city_sewer";
  }
  return u;
}

function mapRoadAccess(roads) {
  if (!roads) return undefined;
  const s = roads.toLowerCase();
  if (/paved/.test(s) && !/dirt|gravel/.test(s)) return "paved";
  if (/gravel/.test(s)) return "gravel";
  if (/dirt|graded|unimproved/.test(s)) return "dirt";
  if (/4wd|four.wheel/.test(s)) return "4wd";
  return undefined;
}

function inferUses(text, acres) {
  const s = text.toLowerCase();
  const uses = new Set();
  if (/homestead/.test(s)) uses.add("homestead");
  if (/off.grid|solar/.test(s)) uses.add("off_grid");
  if (/\brv\b|camp/.test(s)) uses.add("camping_rv");
  if (/recreation|hunt|fish/.test(s)) uses.add("recreation");
  if (/invest/.test(s)) uses.add("investment");
  if (/build|cabin|home site|homesite|manufactured|modular/.test(s)) uses.add("build_later");
  if (/mobile home/.test(s)) uses.add("mobile_home");
  if (uses.size === 0) uses.add(acres && acres >= 5 ? "recreation" : "build_later");
  return [...uses];
}

/* ------------------------------------------------------------------ *
 * Fetch
 * ------------------------------------------------------------------ */
async function fetchAll() {
  const all = [];
  for (let page = 1; page <= 60; page++) {
    const res = await fetch(`${STORE}/products.json?limit=250&page=${page}`);
    if (!res.ok) throw new Error(`products.json page ${page} -> HTTP ${res.status}`);
    const { products = [] } = await res.json();
    if (!products.length) break;
    all.push(...products);
    process.stderr.write(`  fetched page ${page} (${all.length} products)\r`);
  }
  process.stderr.write("\n");
  return all;
}

/* ------------------------------------------------------------------ *
 * Transform
 * ------------------------------------------------------------------ */
function toListing(p) {
  const head = parseHead(p.title);
  if (!head) return { skipped: "unparseable-title" };

  const text = stripHtml(p.body_html);
  const variants = p.variants || [];
  // variant.price is the DOWN PAYMENT billed at checkout, not the monthly.
  const primaryVariant =
    variants.find((v) => v.available) || variants[0] || {};
  const downFromVariant = primaryVariant.price != null ? Number(primaryVariant.price) : undefined;

  const acres =
    num(head.rest.match(RE.acresTitle)?.[1]) ?? num(text.match(RE.acresBody)?.[1]);

  const monthly =
    num(text.match(RE.monthlyBody)?.[1]) ?? num(p.title.match(RE.monthlyTitle)?.[1]);

  const isAuctionBid = RE.downIsBid.test(text);
  // A "$1511 - 100%" variant means the buyer pays the full price at checkout,
  // so that figure is NOT a down payment and must not be labelled as one.
  const isFullPayment = /\b100\s*%/.test(primaryVariant.title || "");
  const downPayment = isFullPayment
    ? 0
    : (downFromVariant ?? num(text.match(RE.downBody)?.[1]));
  const salesPrice = num(text.match(RE.salesPrice)?.[1]);
  const interestRate = num(text.match(RE.interest)?.[1]);
  const statedTerm = num(text.match(RE.termMonths)?.[1]);
  const earlyPayoff = num(text.match(RE.earlyPayoff)?.[1]);
  const taxes = num(text.match(RE.taxes)?.[1]);
  const zoning = text.match(RE.zoning)?.[1]?.trim();
  const utilSummary = text.match(RE.utilities)?.[1]?.trim();
  const roads = text.match(RE.roads)?.[1]?.trim();
  const apn = text.match(RE.apn)?.[1]?.trim();
  const city = text.match(RE.city)?.[1]?.trim();
  const entrance = text.match(RE.entrance)?.[1]?.trim();
  const nearTown = text.match(RE.nearTown)?.[1]?.trim();
  const legal = text.match(RE.legal)?.[1]?.trim();

  const gpsMatch = text.match(RE.gps);
  const embeds = extractEmbeds(p.body_html);
  // Prefer an explicitly published GPS line, then the Street View vantage
  // point, then the map pin.
  const coords = gpsMatch
    ? { lat: Number(gpsMatch[1]), lng: Number(gpsMatch[2]) }
    : embeds.streetView
      ? { lat: embeds.streetView.lat, lng: embeds.streetView.lng }
      : embeds.mapLat != null
        ? { lat: embeds.mapLat, lng: embeds.mapLng }
        : undefined;

  const subdivision = parseSubdivision(head.rest);
  const images = (p.images || []).map((i) => i.src);
  const description = extractDescription(text);
  const faqs = extractFaqs(text);

  // Use the stated term when the listing publishes one; otherwise derive it
  // from price − down ÷ monthly. Leave undefined when neither is possible.
  let termMonths = statedTerm;
  if (termMonths == null && salesPrice != null && monthly > 0) {
    const financed = Math.max(0, salesPrice - (downPayment || 0));
    if (financed > 0) termMonths = Math.max(1, Math.round(financed / monthly));
  }

  const displayTitle = [
    acres != null ? `${acres} Acre${acres === 1 ? "" : "s"}` : null,
    subdivision || head.county,
  ]
    .filter(Boolean)
    .join(" · ");

  // A handful of lots are advertised as cash-only ("Cash Deal", "CASH SALE").
  // They carry no monthly payment, so they must not render as "$0/mo".
  const isCashOnly =
    !monthly && (/\bCASH\s+(SALE|DEAL)\b/i.test(p.title) || salesPrice != null);

  const plan = {
    id: isCashOnly ? "cash" : "seller-financed",
    name: isCashOnly
      ? "Cash Purchase"
      : isAuctionBid
        ? "Owner Financing (Auction)"
        : "Owner Financing",
    badge: downPayment === 0 ? "$0 Down" : undefined,
    downPayment: downPayment ?? 0,
    monthlyPayment: monthly ?? 0,
    termMonths,
    interestRate,
    estimatedMonthlyTax:
      taxes != null ? Math.round((taxes / 12) * 100) / 100 : undefined,
    totalFinancedPrice: salesPrice,
    // What checkout actually bills.
    amountDueToday: isFullPayment
      ? (downFromVariant ?? salesPrice ?? 0)
      : (downPayment ?? 0),
    isFullPayment: isFullPayment || undefined,
    isAuctionBid: isAuctionBid || undefined,
    earlyPayoffDiscountNote: earlyPayoff
      ? `${earlyPayoff}% discount on the remaining balance if paid early`
      : undefined,
  };

  const listing = {
    id: String(p.id),
    handle: p.handle,
    parcelRef: apn || primaryVariant.sku || undefined,
    // Only label it an APN when the seller actually published one.
    apn: apn || undefined,
    propertyCode: primaryVariant.sku || p.handle,
    // Drop the trailing "TERMS $13/Month" marketing tail — the real terms are
    // rendered from structured fields right next to the heading.
    title: head.cleanTitle.split(TERMS_TAIL)[0].replace(/[\s.,-]+$/, "").trim(),
    /** The seller's title exactly as published. */
    sourceTitle: head.cleanTitle,
    displayTitle,
    shortSummary: buildSummary({
      acres,
      subdivision,
      county: head.county,
      state: head.state,
      zoning,
      utilSummary,
    }),
    fullDescription: description || "",
    status: "available",
    saleType: isCashOnly ? "cash_discount" : "seller_financing",

    state: head.state,
    stateCode: head.stateCode,
    county: head.county,
    subdivision: subdivision || undefined,
    nearestTown: city || nearTown || undefined,
    coordinates: coords,

    acres,
    legalDescription: legal || undefined,
    annualTaxes: taxes,
    zoning: zoning || undefined,
    roadAccess: mapRoadAccess(roads),
    roadSurfaceNotes: roads || undefined,
    intendedUses: inferUses(`${text} ${subdivision}`, acres),
    utilities: mapUtilities(utilSummary),

    cashPrice: salesPrice,
    financedPrice: salesPrice,
    defaultPlan: plan,
    earlyPayoffDiscountPercent: earlyPayoff,

    primaryImage: images[0] || undefined,
    galleryImages: images,
    videoUrl: embeds.videoUrl || undefined,
    hasStreetView: !!embeds.streetView,
    panorama: embeds.streetView
      ? {
          id: `sv-${embeds.streetView.panoId}`,
          label: entrance || city || nearTown || `${head.county}, ${head.stateCode}`,
          streetView: embeds.streetView,
        }
      : undefined,

    faqs: faqs.length ? faqs : undefined,
    lastVerifiedAt: p.updated_at ? p.updated_at.slice(0, 10) : undefined,
    sourceUrl: `${STORE}/products/${p.handle}`,
  };

  // Drop undefined keys so the emitted JSON stays small and honest.
  for (const k of Object.keys(listing)) {
    if (listing[k] === undefined) delete listing[k];
  }
  for (const k of Object.keys(listing.defaultPlan)) {
    if (listing.defaultPlan[k] === undefined) delete listing.defaultPlan[k];
  }

  return { listing };
}

/* ------------------------------------------------------------------ *
 * Main
 * ------------------------------------------------------------------ */
const products = IN_FILE
  ? JSON.parse(readFileSync(resolve(IN_FILE), "utf8"))
  : await fetchAll();

const stats = {
  total: products.length,
  nonLand: 0,
  testListing: 0,
  duplicatesDropped: 0,
  notInStock: 0,
  unparseable: 0,
  imported: 0,
  withStreetView: 0,
  withCoords: 0,
  withMonthly: 0,
  withPrice: 0,
  withAcres: 0,
  withImage: 0,
  withFaqs: 0,
  withApn: 0,
  withTerm: 0,
};

const listings = [];
for (const p of products) {
  const inStock = (p.variants || []).some((v) => v.available);
  if (!inStock) {
    stats.notInStock++;
    continue;
  }
  if (NON_LAND.test(p.title)) {
    stats.nonLand++;
    continue;
  }
  if (TEST_LISTING.test(p.handle) || TEST_LISTING.test(p.title)) {
    stats.testListing++;
    continue;
  }
  const { listing, skipped } = toListing(p);
  if (skipped) {
    stats.unparseable++;
    continue;
  }
  listings.push(listing);
  stats.imported++;
  if (listing.panorama?.streetView) stats.withStreetView++;
  if (listing.coordinates) stats.withCoords++;
  if (listing.defaultPlan.monthlyPayment > 0) stats.withMonthly++;
  if (listing.cashPrice) stats.withPrice++;
  if (listing.acres != null) stats.withAcres++;
  if (listing.primaryImage) stats.withImage++;
  if (listing.faqs) stats.withFaqs++;
  if (listing.apn) stats.withApn++;
  if (listing.defaultPlan.termMonths) stats.withTerm++;
}

/**
 * The seller occasionally publishes the same parcel twice — Shopify appends a
 * "-1" suffix to the duplicate handle. Collapse listings that share a title,
 * price and monthly payment, keeping the most recently updated record.
 */
const seen = new Map();
let duplicatesDropped = 0;
for (const l of listings) {
  const key = [
    l.title.toLowerCase().replace(/[^a-z0-9]/g, ""),
    l.cashPrice ?? "",
    l.defaultPlan.monthlyPayment,
    l.saleType,
  ].join("|");
  const prev = seen.get(key);
  if (!prev) {
    seen.set(key, l);
    continue;
  }
  duplicatesDropped++;
  // Keep whichever the store updated most recently.
  if ((l.lastVerifiedAt || "") > (prev.lastVerifiedAt || "")) seen.set(key, l);
}
if (duplicatesDropped) {
  listings.length = 0;
  listings.push(...seen.values());
}
stats.duplicatesDropped = duplicatesDropped;
stats.imported = listings.length;

// Feature the cheapest-per-month lots that have a 360 tour and a photo.
listings.sort((a, b) => {
  const score = (l) =>
    (l.panorama ? 0 : 100) + (l.primaryImage ? 0 : 50) + (l.coordinates ? 0 : 25);
  const d = score(a) - score(b);
  if (d !== 0) return d;
  return (a.defaultPlan.monthlyPayment || 9e9) - (b.defaultPlan.monthlyPayment || 9e9);
});
// Ordering only — we have no demand data, so nothing is flagged "hot".
listings.forEach((l, i) => {
  l.featuredPriority = i + 1;
});

console.log("\n=== IMPORT SUMMARY ===");
for (const [k, v] of Object.entries(stats)) {
  console.log(`  ${k.padEnd(16)} ${v}`);
}
const byState = {};
for (const l of listings) byState[l.state] = (byState[l.state] || 0) + 1;
console.log("\n  states:", Object.entries(byState).sort((a, b) => b[1] - a[1]).map(([s, n]) => `${s}:${n}`).join("  "));

/**
 * Client bundles (catalog, map, home) only ever need what a card and the
 * filters read. Shipping the full records — descriptions, FAQs, legal text,
 * whole galleries — would add ~800KB of JS to every page, so we emit a second,
 * trimmed dataset for anything that runs in the browser.
 */
const cards = listings.map((l) => ({
  id: l.id,
  handle: l.handle,
  title: l.title,
  displayTitle: l.displayTitle,
  shortSummary: l.shortSummary,
  status: l.status,
  saleType: l.saleType,
  featuredPriority: l.featuredPriority,
  state: l.state,
  stateCode: l.stateCode,
  county: l.county,
  subdivision: l.subdivision,
  coordinates: l.coordinates,
  acres: l.acres,
  zoning: l.zoning,
  roadAccess: l.roadAccess,
  intendedUses: l.intendedUses,
  utilities: l.utilities ? { power: l.utilities.power, water: l.utilities.water, sewer: l.utilities.sewer } : undefined,
  cashPrice: l.cashPrice,
  propertyCode: l.propertyCode,
  primaryImage: l.primaryImage,
  galleryImages: l.primaryImage ? [l.primaryImage] : [],
  // Cards only need to know a 360 tour exists; the embed lives on the detail page.
  hasStreetView: !!l.panorama?.streetView,
  defaultPlan: {
    id: l.defaultPlan.id,
    name: l.defaultPlan.name,
    badge: l.defaultPlan.badge,
    downPayment: l.defaultPlan.downPayment,
    monthlyPayment: l.defaultPlan.monthlyPayment,
    termMonths: l.defaultPlan.termMonths,
    interestRate: l.defaultPlan.interestRate,
    totalFinancedPrice: l.defaultPlan.totalFinancedPrice,
    isFullPayment: l.defaultPlan.isFullPayment,
    amountDueToday: l.defaultPlan.amountDueToday,
  },
}));

for (const c of cards) {
  for (const k of Object.keys(c)) if (c[k] === undefined) delete c[k];
  for (const k of Object.keys(c.defaultPlan)) {
    if (c.defaultPlan[k] === undefined) delete c.defaultPlan[k];
  }
}

const kb = (o) => (JSON.stringify(o).length / 1024).toFixed(0);
console.log(`\n  full payload : ${kb(listings)} KB`);
console.log(`  card payload : ${kb(cards)} KB  (shipped to the browser)`);

if (DRY) {
  console.log("\n--dry: nothing written");
} else {
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(listings, null, 2));
  writeFileSync(CARDS_FILE, JSON.stringify(cards));
  console.log(`\nwrote ${listings.length} listings -> ${OUT_FILE}`);
  console.log(`wrote ${cards.length} cards    -> ${CARDS_FILE}`);
}
