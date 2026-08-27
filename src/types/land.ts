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

export interface LandHotspot {
  id: string;
  label: string;
  type: "access_road" | "power_line" | "boundary_corner" | "mountain_view" | "water_feature" | "scene_jump";
  yaw: number; // horizontal angle in radians / degrees
  pitch: number; // vertical angle
  description?: string;
  targetSceneId?: string;
}

export interface PanoramaData {
  id: string;
  label: string;
  panoramaUrl: string;
  posterImage: string;
  initialYaw?: number;
  initialPitch?: number;
  northOffset?: number; // Compass calibration
  capturedAt: string;
  weatherNote?: string;
  hotspots?: LandHotspot[];
  altDescription: string;
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
  termMonths: number;
  interestRate: number; // e.g., 8.9% or 0%
  docFee: number;
  estimatedMonthlyTax: number;
  totalFinancedPrice: number;
  amountDueToday: number; // downPayment + docFee
  earlyPayoffDiscountNote?: string;
}

export interface LandProperty {
  id: string;
  handle: string;
  propertyCode: string; // e.g. "AZ-MOH-215-04"
  title: string;
  displayTitle: string;
  shortSummary: string;
  fullDescription: string;
  status: PropertyStatus;
  saleType: SaleType;
  featuredPriority?: number;
  isHotLot?: boolean;
  
  // Location
  state: string; // "Arizona", "Texas", etc.
  stateCode: string; // "AZ", "TX", etc.
  county: string; // "Mohave County", etc.
  subdivision?: string;
  nearestTown: string;
  distanceToTownMiles: number;
  coordinates: Coordinates;
  accessPointCoordinates?: Coordinates;
  boundaryGeoJson?: ParcelBoundary;

  // Parcel & Specs
  acres: number;
  apn: string; // Assessor's Parcel Number
  legalDescription: string;
  lotBlockUnit?: string;
  elevationFeet: number;
  annualTaxes: number;
  taxYear: number;
  hoaPoaFeeAnnual: number;
  hoaPoaName?: string;
  zoning: string;
  zoningDescription: string;
  timeToBuild: string; // "No time limit", "1 year after permit", etc.
  
  // Physical Characteristics
  terrain: TerrainType;
  roadAccess: RoadAccessType;
  roadSurfaceNotes: string;
  intendedUses: IntendedUse[];
  hasAdjoiningLotsAvailable?: boolean;

  // Utilities Status
  utilities: {
    power: "available_at_street" | "solar_recommended" | "generator_off_grid" | "nearby" | "none";
    water: "well_needed" | "water_haul_tank" | "city_tap_available" | "cistern";
    sewer: "septic_needed" | "city_sewer" | "composting_outhouse";
    gas: "propane_tank" | "natural_gas";
    cellSignal: "strong_4g_5g" | "moderate" | "satellite_recommended";
    notes: string;
    verifiedDate: string;
  };

  // Pricing & Financing
  cashPrice: number;
  cashDiscountPercentage?: number;
  financedPrice: number;
  defaultPlan: FinancingPlan;
  alternativePlans?: FinancingPlan[];
  docFee: number;
  
  // Guarantees & Terms
  guaranteeSummary: string; // e.g. "90-Day 100% Money Back Guarantee"
  contractDeliveryHours: 24 | 48;

  // Media
  primaryImage: string;
  galleryImages: string[];
  panorama?: PanoramaData;
  videoUrl?: string;

  // Due Diligence Documents
  documents: LandDocument[];
  countyContact: {
    assessorPhone: string;
    planningPhone: string;
    recorderPhone: string;
    countyWebsite: string;
  };
  
  // Nearby Highlights
  nearbyHighlights: {
    name: string;
    type: "national_park" | "lake_river" | "town" | "highway" | "airport";
    distanceMiles: number;
    description: string;
  }[];

  // Specific FAQs
  faqs: {
    question: string;
    answer: string;
  }[];

  lastVerifiedAt: string;
}
