import { LandProperty } from "@/types/land";

export const PROPERTIES: LandProperty[] = [
  {
    id: "prop-az-01",
    handle: "2-15-acres-golden-valley-mohave-az",
    propertyCode: "AZ-MOH-215-04",
    title: "2.15 Acres in Golden Valley with Majestic Mountain Panoramas",
    displayTitle: "2.15 Acres Golden Valley",
    shortSummary: "Level build-ready homesite with panoramic Black Mountain views, maintained dirt road access, and flexible zoning for off-grid or homesteading.",
    fullDescription: "Escape to wide-open desert skies on this beautiful 2.15-acre parcel nestled in Golden Valley, Mohave County, AZ. Featuring completely level terrain with easy dirt road access directly off a county-maintained route, this property is ideal for off-grid solar living, manufactured homes, weekend RV getaways, or a permanent desert homestead. Located just 25 minutes from Kingman and under 40 minutes from the Colorado River and Lake Mohave.",
    status: "available",
    saleType: "seller_financing",
    featuredPriority: 1,
    isHotLot: true,

    state: "Arizona",
    stateCode: "AZ",
    county: "Mohave County",
    subdivision: "Golden Valley Ranchos Unit 4",
    nearestTown: "Golden Valley / Kingman",
    distanceToTownMiles: 14,
    coordinates: { lat: 35.2215, lng: -114.2185 },
    accessPointCoordinates: { lat: 35.2218, lng: -114.2180 },
    boundaryGeoJson: {
      type: "Polygon",
      coordinates: [
        [
          [-114.2195, 35.2205],
          [-114.2175, 35.2205],
          [-114.2175, 35.2225],
          [-114.2195, 35.2225],
          [-114.2195, 35.2205],
        ],
      ],
    },

    acres: 2.15,
    apn: "215-04-118",
    legalDescription: "GOLDEN VALLEY RANCHOS UNIT 4 BLK C LOT 12 SEC 19 T21N R18W CONT 2.15 ACRES",
    lotBlockUnit: "Lot 12, Block C, Unit 4",
    elevationFeet: 2850,
    annualTaxes: 48,
    taxYear: 2025,
    hoaPoaFeeAnnual: 0,
    zoning: "AR (Agricultural-Residential)",
    zoningDescription: "Allows single-family homes, manufactured homes, modular homes, small hobby farming, and RV camping with permit.",
    timeToBuild: "No time limit to build",

    terrain: "flat",
    roadAccess: "dirt",
    roadSurfaceNotes: "County-dedicated dirt road, 2WD accessible year-round.",
    intendedUses: ["homestead", "off_grid", "camping_rv", "build_later", "investment"],
    hasAdjoiningLotsAvailable: true,

    utilities: {
      power: "solar_recommended",
      water: "well_needed",
      sewer: "septic_needed",
      gas: "propane_tank",
      cellSignal: "strong_4g_5g",
      notes: "Neighboring parcels have active solar arrays and drilled private wells (water table approx 280-350 ft). Cellular coverage tested on Verizon and AT&T.",
      verifiedDate: "2026-06-15",
    },

    cashPrice: 8490,
    cashDiscountPercentage: 20,
    financedPrice: 10490,
    docFee: 199,

    defaultPlan: {
      id: "plan-standard",
      name: "Low Monthly Option",
      badge: "Most Popular",
      downPayment: 199,
      monthlyPayment: 179,
      termMonths: 60,
      interestRate: 8.9,
      docFee: 199,
      estimatedMonthlyTax: 4,
      totalFinancedPrice: 10490,
      amountDueToday: 398, // $199 down + $199 doc fee
      earlyPayoffDiscountNote: "0% penalty for paying off early anytime.",
    },
    alternativePlans: [
      {
        id: "plan-short",
        name: "36-Month Rapid Equity",
        badge: "Save on Interest",
        downPayment: 499,
        monthlyPayment: 295,
        termMonths: 36,
        interestRate: 5.9,
        docFee: 199,
        estimatedMonthlyTax: 4,
        totalFinancedPrice: 9990,
        amountDueToday: 698,
        earlyPayoffDiscountNote: "Save $500 in total cost.",
      },
      {
        id: "plan-zero-interest",
        name: "12-Month Same As Cash",
        badge: "0% Interest",
        downPayment: 999,
        monthlyPayment: 624,
        termMonths: 12,
        interestRate: 0,
        docFee: 199,
        estimatedMonthlyTax: 4,
        totalFinancedPrice: 8490,
        amountDueToday: 1198,
      },
    ],

    guaranteeSummary: "90-Day 100% Satisfaction Money-Back Guarantee",
    contractDeliveryHours: 24,

    primaryImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-c6a4d2729a99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    ],

    panorama: {
      id: "pano-az-01",
      label: "360° Parcel Center Viewpoint",
      panoramaUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=3840&q=85",
      posterImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      initialYaw: 0.2,
      initialPitch: 0.05,
      northOffset: 45,
      capturedAt: "2026-05-18",
      weatherNote: "Clear skies, light 6mph breeze, midday lighting.",
      altDescription: "Equirectangular 360 view of level high-desert landscape in Golden Valley, Arizona with Black Mountains visible on horizon and gravel access road on north perimeter.",
      hotspots: [
        {
          id: "hs-1",
          label: "North Road Entrance",
          type: "access_road",
          yaw: 0.1,
          pitch: -0.15,
          description: "Direct driveway access point leading to county road.",
        },
        {
          id: "hs-2",
          label: "Black Mountain Range",
          type: "mountain_view",
          yaw: 1.8,
          pitch: 0.1,
          description: "Stunning 360-degree unobstructed western horizon views.",
        },
        {
          id: "hs-3",
          label: "Northwest Corner Pin",
          type: "boundary_corner",
          yaw: -1.2,
          pitch: -0.2,
          description: "Survey-stamped rebar marker at NW property boundary.",
        },
      ],
    },

    documents: [
      {
        id: "doc-1",
        title: "Official Plat Map (Recorded Unit 4)",
        type: "plat_map",
        fileName: "Mohave_County_Plat_Book_12_Page_33.pdf",
        fileSize: "2.4 MB",
        lastVerifiedAt: "2026-06-01",
        downloadUrl: "#",
      },
      {
        id: "doc-2",
        title: "Covenants, Conditions & Restrictions (CC&Rs)",
        type: "covenants_restrictions",
        fileName: "Golden_Valley_Ranchos_CCRs.pdf",
        fileSize: "1.1 MB",
        lastVerifiedAt: "2026-06-01",
        downloadUrl: "#",
      },
      {
        id: "doc-3",
        title: "Sample Land Installment Contract",
        type: "sample_contract",
        fileName: "OLS_Standard_Seller_Finance_Agreement.pdf",
        fileSize: "850 KB",
        lastVerifiedAt: "2026-07-10",
        downloadUrl: "#",
      },
    ],

    countyContact: {
      assessorPhone: "(928) 753-0703",
      planningPhone: "(928) 757-0903",
      recorderPhone: "(928) 753-0701",
      countyWebsite: "https://www.mohave.gov",
    },

    nearbyHighlights: [
      { name: "Lake Mohave / Katherine Landing", type: "lake_river", distanceMiles: 28, description: "Boating, trophy bass fishing, and sandy swimming coves." },
      { name: "Historic Kingman, Route 66", type: "town", distanceMiles: 14, description: "Groceries (Walmart, Safeway), hospitals, hardware stores, and dining." },
      { name: "Grand Canyon West (Skywalk)", type: "national_park", distanceMiles: 52, description: "World-famous canyon viewing and helicopter tours." },
      { name: "Las Vegas International Airport", type: "airport", distanceMiles: 88, description: "Easy 90-minute highway drive." },
    ],

    faqs: [
      {
        question: "Can I park my RV on this parcel?",
        answer: "Yes! Mohave County allows temporary recreational vehicle camping for up to 14 consecutive days at a time, or up to 30 days with a free county camping permit. Long-term RV living is permitted once a building permit and septic system are active.",
      },
      {
        question: "How does the 90-Day Money-Back Guarantee work?",
        answer: "If you visit the property or change your mind within 90 days of reserving, we will refund 100% of your principal payments or allow you to roll all your equity into another parcel in our inventory. No questions asked.",
      },
      {
        question: "Is there a credit check or bank approval needed?",
        answer: "No. 100% of our seller-financed properties feature guaranteed approval with zero credit checks, zero employment verification, and zero prepayment penalties.",
      },
    ],

    lastVerifiedAt: "2026-07-20",
  },

  {
    id: "prop-co-02",
    handle: "5-acres-costilla-county-colorado-san-luis",
    propertyCode: "CO-COS-500-19",
    title: "5.00 Pristine Acres with Blanca Peak Views in Costilla County, CO",
    displayTitle: "5 Acres San Luis Valley",
    shortSummary: "Spectacular alpine landscape with unobstructed Mount Blanca views, direct road frontage, and unlimited outdoor recreation near the Rio Grande.",
    fullDescription: "Experience the majesty of Colorado's Sangre de Cristo mountain range with this 5.00-acre paradise in Costilla County. Situated on a gentle rise overlooking the San Luis Valley floor, this expansive parcel gives you sweeping 14,000-ft mountain vistas, crisp fresh air, and legendary dark night skies. Ideal for camping, seasonal off-grid living, solar setups, or long-term land investment.",
    status: "available",
    saleType: "seller_financing",
    featuredPriority: 2,
    isHotLot: true,

    state: "Colorado",
    stateCode: "CO",
    county: "Costilla County",
    subdivision: "San Luis Valley Ranches Unit 19",
    nearestTown: "San Luis / Alamosa",
    distanceToTownMiles: 16,
    coordinates: { lat: 37.3824, lng: -105.4982 },
    accessPointCoordinates: { lat: 37.3829, lng: -105.4975 },
    boundaryGeoJson: {
      type: "Polygon",
      coordinates: [
        [
          [-105.5005, 37.3810],
          [-105.4960, 37.3810],
          [-105.4960, 37.3840],
          [-105.5005, 37.3840],
          [-105.5005, 37.3810],
        ],
      ],
    },

    acres: 5.0,
    apn: "703-19-420",
    legalDescription: "S.L.V.R. UNIT 19 BLK 14 LOT 8 CONT. 5.00 ACRES M/L",
    lotBlockUnit: "Lot 8, Block 14, Unit 19",
    elevationFeet: 7750,
    annualTaxes: 65,
    taxYear: 2025,
    hoaPoaFeeAnnual: 0,
    zoning: "Estate Residential",
    zoningDescription: "Allows single-family cabins, homes, off-grid tiny homes (minimum 600 sq ft), farming, and seasonal camping.",
    timeToBuild: "No time limit to build",

    terrain: "gently_rolling",
    roadAccess: "gravel",
    roadSurfaceNotes: "Maintained gravel/dirt road, year-round access.",
    intendedUses: ["camping_rv", "off_grid", "homestead", "recreation", "investment"],
    hasAdjoiningLotsAvailable: false,

    utilities: {
      power: "solar_recommended",
      water: "well_needed",
      sewer: "septic_needed",
      gas: "propane_tank",
      cellSignal: "moderate",
      notes: "Colorado receives 300+ days of sunshine/year making solar exceptionally effective. Wells in this section average 80-140 ft deep.",
      verifiedDate: "2026-06-10",
    },

    cashPrice: 7950,
    cashDiscountPercentage: 25,
    financedPrice: 9950,
    docFee: 199,

    defaultPlan: {
      id: "plan-standard-co",
      name: "Affordable Monthly Plan",
      badge: "Zero Down Promotion",
      downPayment: 149,
      monthlyPayment: 159,
      termMonths: 68,
      interestRate: 8.5,
      docFee: 199,
      estimatedMonthlyTax: 5,
      totalFinancedPrice: 9950,
      amountDueToday: 348,
      earlyPayoffDiscountNote: "Pay off balance early and receive a 10% credit.",
    },
    alternativePlans: [
      {
        id: "plan-48mo",
        name: "48-Month Balanced",
        downPayment: 299,
        monthlyPayment: 228,
        termMonths: 48,
        interestRate: 6.9,
        docFee: 199,
        estimatedMonthlyTax: 5,
        totalFinancedPrice: 9450,
        amountDueToday: 498,
      },
    ],

    guaranteeSummary: "90-Day 100% Satisfaction Money-Back Guarantee",
    contractDeliveryHours: 24,

    primaryImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    ],

    panorama: {
      id: "pano-co-02",
      label: "360° Alpine Valley Panorama",
      panoramaUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=3840&q=85",
      posterImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      initialYaw: 1.0,
      initialPitch: 0.1,
      northOffset: 0,
      capturedAt: "2026-06-22",
      weatherNote: "Sunny 72°F afternoon, clear alpine horizon.",
      altDescription: "Equirectangular view of Costilla County Colorado grassland with towering Mount Blanca and Sangre de Cristo mountain range in backdrop.",
      hotspots: [
        {
          id: "hs-co-1",
          label: "Mount Blanca (14,345 ft)",
          type: "mountain_view",
          yaw: 0.95,
          pitch: 0.2,
          description: "One of Colorado's most prominent 14er peaks.",
        },
        {
          id: "hs-co-2",
          label: "Rio Grande River Corridor",
          type: "water_feature",
          yaw: -2.1,
          pitch: -0.05,
          description: "Located just 12 miles west for trout fishing and rafting.",
        },
      ],
    },

    documents: [
      {
        id: "doc-co-1",
        title: "Costilla County Plat & Assessor Map",
        type: "plat_map",
        fileName: "Costilla_Parcel_70319420.pdf",
        fileSize: "1.8 MB",
        lastVerifiedAt: "2026-06-01",
        downloadUrl: "#",
      },
      {
        id: "doc-co-2",
        title: "Costilla County Building & Camping Guide",
        type: "county_zoning",
        fileName: "Costilla_Planning_Zoning_Guide_2026.pdf",
        fileSize: "3.2 MB",
        lastVerifiedAt: "2026-05-15",
        downloadUrl: "#",
      },
    ],

    countyContact: {
      assessorPhone: "(719) 937-7670",
      planningPhone: "(719) 937-7668",
      recorderPhone: "(719) 937-7671",
      countyWebsite: "https://www.costillacountycolorado.net",
    },

    nearbyHighlights: [
      { name: "Great Sand Dunes National Park", type: "national_park", distanceMiles: 38, description: "North America's tallest sand dunes, hiking, and Medano Creek." },
      { name: "Mountain View Reservoir / Sanchez", type: "lake_river", distanceMiles: 18, description: "Boating, northern pike, and walleye fishing." },
      { name: "Alamosa Regional Commercial Center", type: "town", distanceMiles: 32, description: "Hospitals, college campus, big-box shopping." },
    ],

    faqs: [
      {
        question: "Are there building restrictions or minimum square footage?",
        answer: "Costilla County has a 600 sq. ft. minimum home requirement. Off-grid structures with approved solar and septic systems are widely supported.",
      },
      {
        question: "Can I visit the property before buying?",
        answer: "Absolutely! We provide exact GPS coordinate pins and turn-by-turn driving directions so you or your family can explore the property anytime.",
      },
    ],

    lastVerifiedAt: "2026-07-15",
  },

  {
    id: "prop-tx-03",
    handle: "10-acres-presidio-county-texas-west-texas",
    propertyCode: "TX-PRE-100-08",
    title: "10.00 Vast Desert Acres near Big Bend in Presidio County, TX",
    displayTitle: "10 Acres West Texas",
    shortSummary: "Incredible wide-open West Texas terrain with Chinati Mountain views, pristine stargazing skies, and zero county building restrictions.",
    fullDescription: "Own a true slice of the legendary American frontier. This 10.00-acre estate in Presidio County, Texas offers unmatched solitude, dramatic rugged desert topography, and world-renowned Class-1 dark sky stargazing. Located a short drive from historic Marfa, Presidio, and the Big Bend State Park corridor, you can camp, hike, shoot, stargaze, or park your RV with total freedom.",
    status: "available",
    saleType: "seller_financing",
    featuredPriority: 3,
    isHotLot: true,

    state: "Texas",
    stateCode: "TX",
    county: "Presidio County",
    subdivision: "Green Valley Farms Tract 8",
    nearestTown: "Presidio / Marfa",
    distanceToTownMiles: 22,
    coordinates: { lat: 29.8451, lng: -104.2814 },
    accessPointCoordinates: { lat: 29.8458, lng: -104.2805 },
    boundaryGeoJson: {
      type: "Polygon",
      coordinates: [
        [
          [-104.2840, 29.8430],
          [-104.2785, 29.8430],
          [-104.2785, 29.8475],
          [-104.2840, 29.8475],
          [-104.2840, 29.8430],
        ],
      ],
    },

    acres: 10.0,
    apn: "10283-0008-00",
    legalDescription: "TRACT 8 GREEN VALLEY FARMS SUBD SEC 14 BLK 200 CONT 10.00 ACRES",
    elevationFeet: 3400,
    annualTaxes: 82,
    taxYear: 2025,
    hoaPoaFeeAnnual: 0,
    zoning: "No Zoning (Unincorporated)",
    zoningDescription: "No county zoning or building codes in unincorporated Presidio County. Complete freedom for cabins, RVs, hunting camps, and containers.",
    timeToBuild: "No time limit to build",

    terrain: "desert_plain",
    roadAccess: "dirt",
    roadSurfaceNotes: "Dirt road easement directly connecting to FM 170.",
    intendedUses: ["recreation", "camping_rv", "off_grid", "homestead", "investment"],
    hasAdjoiningLotsAvailable: true,

    utilities: {
      power: "solar_recommended",
      water: "water_haul_tank",
      sewer: "septic_needed",
      gas: "propane_tank",
      cellSignal: "moderate",
      notes: "West Texas receives among the highest solar irradiance levels in the United States. Many residents utilize rainwater catchment or bulk water delivery.",
      verifiedDate: "2026-05-30",
    },

    cashPrice: 12900,
    cashDiscountPercentage: 20,
    financedPrice: 15900,
    docFee: 199,

    defaultPlan: {
      id: "plan-standard-tx",
      name: "10-Acre Value Plan",
      badge: "Best Acreage Value",
      downPayment: 299,
      monthlyPayment: 249,
      termMonths: 72,
      interestRate: 8.9,
      docFee: 199,
      estimatedMonthlyTax: 7,
      totalFinancedPrice: 15900,
      amountDueToday: 498,
    },

    guaranteeSummary: "90-Day 100% Satisfaction Money-Back Guarantee",
    contractDeliveryHours: 24,

    primaryImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-c6a4d2729a99?auto=format&fit=crop&w=1200&q=80",
    ],

    panorama: {
      id: "pano-tx-03",
      label: "360° West Texas Frontier Viewpoint",
      panoramaUrl: "https://images.unsplash.com/photo-1542314831-c6a4d2729a99?auto=format&fit=crop&w=3840&q=85",
      posterImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      initialYaw: 0.5,
      initialPitch: 0.05,
      northOffset: 90,
      capturedAt: "2026-06-15",
      weatherNote: "Clear dry afternoon, 10-mile horizon visibility.",
      altDescription: "Equirectangular view of vast Presidio County desert flats with rugged Chinati Mountain silhouettes.",
      hotspots: [
        {
          id: "hs-tx-1",
          label: "Chinati Peak Horizon",
          type: "mountain_view",
          yaw: 0.8,
          pitch: 0.1,
          description: "Distinct mountain peak commanding the southwest horizon.",
        },
        {
          id: "hs-tx-2",
          label: "County Trail Access Road",
          type: "access_road",
          yaw: -1.5,
          pitch: -0.2,
          description: "Maintained dirt access path along northern boundary.",
        },
      ],
    },

    documents: [
      {
        id: "doc-tx-1",
        title: "Recorded Survey & Boundary Map",
        type: "survey",
        fileName: "Presidio_Green_Valley_Sec14_Survey.pdf",
        fileSize: "2.1 MB",
        lastVerifiedAt: "2026-04-10",
        downloadUrl: "#",
      },
    ],

    countyContact: {
      assessorPhone: "(432) 729-4081",
      planningPhone: "(432) 729-4452",
      recorderPhone: "(432) 729-4811",
      countyWebsite: "https://www.co.presidio.tx.us",
    },

    nearbyHighlights: [
      { name: "Big Bend Ranch State Park", type: "national_park", distanceMiles: 19, description: "300,000 acres of canyons, Rio Grande river trails, and 4WD overland routes." },
      { name: "Marfa, Texas (Art & Cultural Hub)", type: "town", distanceMiles: 45, description: "World-renowned art galleries, fine dining, and mysterious Marfa Lights." },
    ],

    faqs: [
      {
        question: "Are there HOA fees or building rules?",
        answer: "There are zero HOA fees, zero covenants, and no county zoning restrictions whatsoever. You have maximum freedom for personal recreation and building.",
      },
    ],

    lastVerifiedAt: "2026-07-01",
  },

  {
    id: "prop-fl-04",
    handle: "0-25-acres-putnam-county-florida-interlachen",
    propertyCode: "FL-PUT-025-11",
    title: "0.25 Acres Residential Lot in Interlachen Lakes, FL",
    displayTitle: "0.25 Acres Lake District FL",
    shortSummary: "Buildable paved-road homesite surrounded by dozens of pristine freshwater lakes, with electricity available along the frontage.",
    fullDescription: "Build your dream Florida retreat or investment portfolio on this quarter-acre dry residential parcel in Interlachen Lakes Estates, Putnam County. Enjoy power lines running directly along the street, paved county road access, and walking distance to nearby recreational lakes. Only 35 minutes to Gainesville and 45 minutes to St. Augustine beaches.",
    status: "available",
    saleType: "seller_financing",
    featuredPriority: 4,
    isHotLot: true,

    state: "Florida",
    stateCode: "FL",
    county: "Putnam County",
    subdivision: "Interlachen Lakes Estates Unit 16",
    nearestTown: "Interlachen / Gainesville",
    distanceToTownMiles: 4,
    coordinates: { lat: 29.6241, lng: -81.8924 },
    boundaryGeoJson: {
      type: "Polygon",
      coordinates: [
        [
          [-81.8930, 29.6236],
          [-81.8918, 29.6236],
          [-81.8918, 29.6246],
          [-81.8930, 29.6246],
          [-81.8930, 29.6236],
        ],
      ],
    },

    acres: 0.25,
    apn: "04-10-24-4075-0160-0220",
    legalDescription: "INTERLACHEN LAKES ESTATES UNIT 16 MB5 P4 BLK 16 LOT 22",
    elevationFeet: 110,
    annualTaxes: 78,
    taxYear: 2025,
    hoaPoaFeeAnnual: 0,
    zoning: "R-2 Residential",
    zoningDescription: "Permits site-built single-family homes and modular residential homes.",
    timeToBuild: "No time limit to build",

    terrain: "flat",
    roadAccess: "paved",
    roadSurfaceNotes: "Paved public street with electric utility poles.",
    intendedUses: ["homestead", "build_later", "investment"],
    hasAdjoiningLotsAvailable: false,

    utilities: {
      power: "available_at_street",
      water: "well_needed",
      sewer: "septic_needed",
      gas: "propane_tank",
      cellSignal: "strong_4g_5g",
      notes: "Electric power lines run along the front property line (Clay Electric Co-op). Shallow wells in area (approx 40-70 ft).",
      verifiedDate: "2026-06-25",
    },

    cashPrice: 6990,
    cashDiscountPercentage: 15,
    financedPrice: 8490,
    docFee: 199,

    defaultPlan: {
      id: "plan-fl-standard",
      name: "Starter Lot Plan",
      badge: "Power at Street",
      downPayment: 199,
      monthlyPayment: 149,
      termMonths: 60,
      interestRate: 8.5,
      docFee: 199,
      estimatedMonthlyTax: 7,
      totalFinancedPrice: 8490,
      amountDueToday: 398,
    },

    guaranteeSummary: "90-Day 100% Satisfaction Money-Back Guarantee",
    contractDeliveryHours: 24,

    primaryImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-c6a4d2729a99?auto=format&fit=crop&w=1200&q=80",
    ],

    documents: [
      {
        id: "doc-fl-1",
        title: "Putnam County Recorded Plat",
        type: "plat_map",
        fileName: "Putnam_ILE_Unit16_Plat.pdf",
        fileSize: "1.4 MB",
        lastVerifiedAt: "2026-05-10",
        downloadUrl: "#",
      },
    ],

    countyContact: {
      assessorPhone: "(386) 329-0286",
      planningPhone: "(386) 329-0491",
      recorderPhone: "(386) 326-7600",
      countyWebsite: "https://main.putnam-fl.com",
    },

    nearbyHighlights: [
      { name: "Lake Grandin & Lake Galilee", type: "lake_river", distanceMiles: 2, description: "Public boat ramps, bass fishing, water skiing." },
      { name: "Historic St. Augustine & Atlantic Beaches", type: "town", distanceMiles: 42, description: "America's oldest city, sandy beaches, historic forts." },
    ],

    faqs: [
      {
        question: "Is this lot in a flood zone?",
        answer: "This parcel is located in FEMA Flood Zone X (Area of Minimal Flood Hazard), which is high, dry, and not in a special flood hazard zone.",
      },
    ],

    lastVerifiedAt: "2026-07-18",
  },

  {
    id: "prop-nv-05",
    handle: "2-06-acres-elko-county-nevada-meadow-valley",
    propertyCode: "NV-ELK-206-03",
    title: "2.06 Acres with Ruby Mountain Views in Elko County, NV",
    displayTitle: "2.06 Acres Ruby Valley",
    shortSummary: "High desert expanse near the breathtaking Ruby Mountains, with direct two-wheel drive road access and wide open zoning.",
    fullDescription: "Discover true Western tranquility on this 2.06-acre parcel in Elko County, Nevada. Known as the 'Swiss Alps of Nevada', the nearby Ruby Mountains provide an extraordinary scenic backdrop and world-class trout fishing, hunting, and trail exploring. Perfect for camping, off-grid ranching, or an affordable mountain-view retreat.",
    status: "available",
    saleType: "seller_financing",
    featuredPriority: 5,
    isHotLot: false,

    state: "Nevada",
    stateCode: "NV",
    county: "Elko County",
    subdivision: "Meadow Valley Ranchos Unit 3",
    nearestTown: "Elko",
    distanceToTownMiles: 18,
    coordinates: { lat: 40.9124, lng: -115.7482 },
    boundaryGeoJson: {
      type: "Polygon",
      coordinates: [
        [
          [-115.7500, 40.9110],
          [-115.7460, 40.9110],
          [-115.7460, 40.9135],
          [-115.7500, 40.9135],
          [-115.7500, 40.9110],
        ],
      ],
    },

    acres: 2.06,
    apn: "067-013-007",
    legalDescription: "MEADOW VALLEY RANCHOS UNIT 3 BLK 42 LOT 7 CONT 2.06 ACRES",
    elevationFeet: 5200,
    annualTaxes: 34,
    taxYear: 2025,
    hoaPoaFeeAnnual: 0,
    zoning: "Open Space / Rural Residential",
    zoningDescription: "Allows residential building, manufactured homes, agriculture, livestock, and recreational camping.",
    timeToBuild: "No time limit to build",

    terrain: "flat",
    roadAccess: "dirt",
    roadSurfaceNotes: "County dirt road, 2WD accessible.",
    intendedUses: ["off_grid", "camping_rv", "homestead", "recreation", "investment"],
    hasAdjoiningLotsAvailable: false,

    utilities: {
      power: "solar_recommended",
      water: "well_needed",
      sewer: "septic_needed",
      gas: "propane_tank",
      cellSignal: "moderate",
      notes: "Abundant Nevada sunshine makes solar highly efficient. Private wells in this quadrant range from 150-250 ft deep.",
      verifiedDate: "2026-06-12",
    },

    cashPrice: 6490,
    cashDiscountPercentage: 20,
    financedPrice: 7990,
    docFee: 199,

    defaultPlan: {
      id: "plan-nv-standard",
      name: "Low Payment Term",
      badge: "Super Affordable",
      downPayment: 149,
      monthlyPayment: 139,
      termMonths: 60,
      interestRate: 8.9,
      docFee: 199,
      estimatedMonthlyTax: 3,
      totalFinancedPrice: 7990,
      amountDueToday: 348,
    },

    guaranteeSummary: "90-Day 100% Satisfaction Money-Back Guarantee",
    contractDeliveryHours: 24,

    primaryImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    ],

    documents: [
      {
        id: "doc-nv-1",
        title: "Elko County Plat & Assessor Map",
        type: "plat_map",
        fileName: "Elko_MVR_Unit3_Plat.pdf",
        fileSize: "1.6 MB",
        lastVerifiedAt: "2026-05-18",
        downloadUrl: "#",
      },
    ],

    countyContact: {
      assessorPhone: "(775) 738-5217",
      planningPhone: "(775) 738-6816",
      recorderPhone: "(775) 738-3044",
      countyWebsite: "https://www.elkocountynv.net",
    },

    nearbyHighlights: [
      { name: "Ruby Mountains & Lamoille Canyon", type: "national_park", distanceMiles: 24, description: "Glacier-carved canyons, alpine hiking, snowmobiling." },
      { name: "City of Elko (Commercial Hub)", type: "town", distanceMiles: 18, description: "Casinos, dining, Home Depot, airports, healthcare." },
    ],

    faqs: [
      {
        question: "Can I keep horses or livestock on this property?",
        answer: "Yes, Elko County's rural residential zoning permits livestock, horses, poultry, and small-scale agriculture.",
      },
    ],

    lastVerifiedAt: "2026-07-10",
  },

  {
    id: "prop-az-06-sold",
    handle: "1-25-acres-apache-county-concho-az-sold",
    propertyCode: "AZ-APA-125-09",
    title: "1.25 Acres in Concho Valley with Juniper Trees (SOLD)",
    displayTitle: "1.25 Acres Concho Pines",
    shortSummary: "Beautiful tree-covered homesite near Concho Lake. This lot has been successfully sold to a verified land buyer.",
    fullDescription: "This heavily treed 1.25-acre parcel in Concho Valley, Apache County, AZ has been purchased under our seller-financing program. Join our waitlist to be automatically notified when nearby adjoining parcels become available.",
    status: "sold",
    saleType: "seller_financing",
    featuredPriority: 6,
    isHotLot: false,

    state: "Arizona",
    stateCode: "AZ",
    county: "Apache County",
    subdivision: "Concho Valley Unit 2",
    nearestTown: "Concho / Show Low",
    distanceToTownMiles: 8,
    coordinates: { lat: 34.4215, lng: -109.6185 },

    acres: 1.25,
    apn: "201-28-091",
    legalDescription: "CONCHO VALLEY UNIT 2 LOT 41",
    elevationFeet: 6300,
    annualTaxes: 28,
    taxYear: 2025,
    hoaPoaFeeAnnual: 0,
    zoning: "Agricultural General",
    zoningDescription: "Rural residential, camping, cabins.",
    timeToBuild: "No time limit to build",

    terrain: "wooded",
    roadAccess: "dirt",
    roadSurfaceNotes: "County dirt road.",
    intendedUses: ["homestead", "camping_rv", "off_grid"],

    utilities: {
      power: "solar_recommended",
      water: "well_needed",
      sewer: "septic_needed",
      gas: "propane_tank",
      cellSignal: "moderate",
      notes: "Wooded parcel with mature pinon and juniper trees.",
      verifiedDate: "2026-04-10",
    },

    cashPrice: 4990,
    financedPrice: 5990,
    docFee: 199,

    defaultPlan: {
      id: "plan-sold",
      name: "Sold Contract",
      downPayment: 149,
      monthlyPayment: 119,
      termMonths: 54,
      interestRate: 8.9,
      docFee: 199,
      estimatedMonthlyTax: 3,
      totalFinancedPrice: 5990,
      amountDueToday: 348,
    },

    guaranteeSummary: "90-Day Money-Back Guarantee",
    contractDeliveryHours: 24,

    primaryImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    ],

    documents: [],

    countyContact: {
      assessorPhone: "(928) 337-7624",
      planningPhone: "(928) 337-7526",
      recorderPhone: "(928) 337-7515",
      countyWebsite: "https://www.apachecountyaz.gov",
    },

    nearbyHighlights: [
      { name: "Concho Lake Recreation Area", type: "lake_river", distanceMiles: 5, description: "Trout stocking, kayak launch, picnic grounds." },
    ],

    faqs: [],
    lastVerifiedAt: "2026-06-01",
  },
];
