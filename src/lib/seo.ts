import { LandProperty } from "@/types/land";

export function generateProductSchema(property: LandProperty) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: property.title,
    image: property.galleryImages,
    description: property.shortSummary,
    sku: property.propertyCode,
    mpn: property.apn,
    brand: {
      "@type": "Brand",
      name: "Online Land Sales",
    },
    offers: {
      "@type": "Offer",
      url: `https://onlinelandsales.com/products/${property.handle}`,
      priceCurrency: "USD",
      price: property.cashPrice,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      seller: {
        "@type": "Organization",
        name: "Online Land Sales, LLC",
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Acreage", value: `${property.acres} Acres` },
      { "@type": "PropertyValue", name: "APN", value: property.apn },
      { "@type": "PropertyValue", name: "County", value: property.county },
      { "@type": "PropertyValue", name: "State", value: property.state },
      { "@type": "PropertyValue", name: "Monthly Payment", value: `$${property.defaultPlan.monthlyPayment}/mo` },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://onlinelandsales.com${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Online Land Sales",
    url: "https://onlinelandsales.com",
    logo: "https://onlinelandsales.com/logo.png",
    description: "Affordable U.S. vacant land with guaranteed seller financing, no credit checks, and 90-day money-back guarantee.",
    foundingDate: "2004",
    telephone: "+1-800-555-LAND",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}
