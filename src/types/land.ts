export type PropertyStatus = "available" | "reserved" | "sold" | "auction" | "waitlist";
export type SaleType = "seller_financing" | "cash_discount" | "same_as_cash" | "auction";
export type RoadAccessType = "paved" | "gravel" | "dirt" | "4wd" | "unpaved_county" | "deeded_easement";
export type TerrainType = "flat" | "gently_rolling" | "desert_plain" | "mountainous" | "wooded" | "hillside";
export type IntendedUse = "homestead" | "off_grid" | "recreation" | "camping_rv" | "investment" | "build_later" | "mobile_home" | "tiny_home";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ParcelBoundary {
  type: "Polygon";
  coordinates: [number, number][][]; // Array of GeoJSON lat/lng rings
}

/**
 * A Google Street View 360° vantage point, parsed out of the
 * `google.com/maps/embed?pb=...` iframe published on the live store.
 */
export interface StreetViewData {
  /** Google panorama id, e.g. "9j-t9qMkx-hmF1BSCjzNqA". */
  panoId: string;
  lat: number;
  lng: number;
  /** Compass heading in degrees. */
  heading: number;
  /** Vertical pitch in degrees. */
  pitch: number;
  /** Field-of-view factor from the embed (`!5f`). */
  fov?: number;
  /** The full embed URL, used verbatim as the iframe src. */
  embedUrl: string;
}

export interface PanoramaData {
  id: string;
  /** Vantage-point caption, e.g. the subdivision entrance or nearest town. */
  label: string;
  /** Present when the listing has a Google Street View 360° tour. */
  streetView?: StreetViewData;
}

export interface LandDocument {
  id: string;
  title: string;
  type: "plat_map" | "survey" | "covenants_restrictions" | "sample_contract" | "deed_sample" | "county_zoning" | "tax_record";
  fileName: string;
  fileSize: string;
  lastVerifiedAt: string;
  downloadUrl: string;
}

export interface FinancingPlan {
  id: string;
  name: string;
  badge?: string;
  downPayment: number;
  monthlyPayment: number;
  /** Undefined when the listing doesn't state a term. */
  termMonths?: number;
  interestRate?: number; // e.g., 9% APR
  docFee?: number;
  estimatedMonthlyTax?: number;
  /** The seller's stated total property price. */
  totalFinancedPrice?: number;
  amountDueToday: number;
  /** True when the variant bills the full purchase price at checkout ("100%" tier). */
  isFullPayment?: boolean;
  /** True when checkout collects a bid rather than a fixed down payment. */
  isAuctionBid?: boolean;
  earlyPayoffDiscountNote?: string;
}

export interface LandProperty {
  id: string;
  handle: string;
  propertyCode: string; // e.g. "AZ-MOH-215-04"
  title: string;
  displayTitle: string;
  shortSummary: string;
  fullDescription?: string;
  status: PropertyStatus;
  saleType: SaleType;
  featuredPriority?: number;
  /** Reserved — we have no demand data, so nothing is currently flagged. */
  isHotLot?: boolean;
  
  // Location
  state: string; // "Arizona", "Texas", etc.
  stateCode: string; // "AZ", "TX", etc.
  county: string; // "Mohave County", etc.
  subdivision?: string;
  nearestTown?: string;
  distanceToTownMiles?: number;
  /** Absent for the few listings that publish neither GPS nor a map embed. */
  coordinates?: Coordinates;
  accessPointCoordinates?: Coordinates;
  boundaryGeoJson?: ParcelBoundary;

  // Parcel & Specs
  //
  // NOTE: fields below are optional because the live catalog does not publish
  // them for every parcel. Anything we cannot source from the real listing is
  // left undefined and hidden in the UI rather than filled with a placeholder.
  acres?: number;
  /** Seller's own parcel reference (Shopify SKU). Not a county APN. */
  parcelRef?: string;
  /** County Assessor's Parcel Number — only set when the listing publishes one. */
  apn?: string;
  legalDescription?: string;
  lotBlockUnit?: string;
  elevationFeet?: number;
  annualTaxes?: number;
  taxYear?: number;
  hoaPoaFeeAnnual?: number;
  hoaPoaName?: string;
  zoning?: string;
  zoningDescription?: string;
  timeToBuild?: string; // "No time limit", "1 year after permit", etc.

  // Physical Characteristics
  terrain?: TerrainType;
  roadAccess?: RoadAccessType;
  roadSurfaceNotes?: string;
  intendedUses: IntendedUse[];
  hasAdjoiningLotsAvailable?: boolean;

  // Utilities Status — `summary` is the seller's own free-text line.
  utilities?: {
    power?: "available_at_street" | "solar_recommended" | "generator_off_grid" | "nearby" | "none";
    water?: "well_needed" | "water_haul_tank" | "city_tap_available" | "cistern";
    sewer?: "septic_needed" | "city_sewer" | "composting_outhouse";
    gas?: "propane_tank" | "natural_gas";
    cellSignal?: "strong_4g_5g" | "moderate" | "satellite_recommended";
    /** Verbatim "Utilities:" line from the listing. */
    summary?: string;
    notes?: string;
    verifiedDate?: string;
  };

  // Pricing & Financing
  /** Seller's published "Sales Price". Absent on a handful of listings. */
  cashPrice?: number;
  cashDiscountPercentage?: number;
  financedPrice?: number;
  defaultPlan: FinancingPlan;
  alternativePlans?: FinancingPlan[];
  docFee?: number;
  /** e.g. 10 for "10% DISCOUNT ON REMAINING BALANCE IF PAID EARLY". */
  earlyPayoffDiscountPercent?: number;

  // Guarantees & Terms
  guaranteeSummary?: string;
  contractDeliveryHours?: 24 | 48;

  // Media
  primaryImage?: string;
  galleryImages: string[];
  panorama?: PanoramaData;
  /** True when a Google Street View 360° tour exists (also present on light card records). */
  hasStreetView?: boolean;
  videoUrl?: string;

  // Due Diligence Documents — only populated when the seller actually
  // publishes downloadable files for the parcel.
  documents?: LandDocument[];
  countyContact?: {
    assessorPhone?: string;
    planningPhone?: string;
    recorderPhone?: string;
    countyWebsite?: string;
  };

  // Nearby Highlights
  nearbyHighlights?: {
    name: string;
    type: "national_park" | "lake_river" | "town" | "highway" | "airport";
    distanceMiles?: number;
    description: string;
  }[];

  // Parcel-specific FAQs lifted from the listing's own Q:/A: copy.
  faqs?: {
    question: string;
    answer: string;
  }[];

  /** Shopify `updated_at` — when the source listing last changed. */
  lastVerifiedAt?: string;
  /** The seller's title exactly as published on the store. */
  sourceTitle?: string;
  /** Canonical listing on the live store. */
  sourceUrl?: string;
}
