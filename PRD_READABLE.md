PRODUCT REQUIREMENTS DOCUMENT | V1.0

Online Land Sales

Next.js Rebuild PRD &amp; Implementation Plan

A conversion-first, headless Shopify storefront with map-based discovery, transparent financing, and immersive 360-degree land tours.

Prepared for

Shahzar Ali

Build environment

Antigravity

Target stack

Next.js App Router, TypeScript, Tailwind CSS, GSAP

Commerce

Shopify Storefront API + hosted checkout

Audit date

27 August 2026

Status

Implementation-ready draft; business and legal sign-off required

<w:tblPr><w:tblW w:type="dxa" w:w="9360"/><w:jc w:val="left"/><w:tblLayout w:type="fixed"/><w:tblLook w:firstColumn="1" w:firstRow="1" w:lastColumn="0" w:lastRow="0" w:noHBand="0" w:noVBand="1" w:val="04A0"/><w:tblInd w:w="120" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="10" w:space="0" w:color="2F6B4F"/><w:left w:val="single" w:sz="10" w:space="0" w:color="2F6B4F"/><w:bottom w:val="single" w:sz="10" w:space="0" w:color="2F6B4F"/><w:right w:val="single" w:sz="10" w:space="0" w:color="2F6B4F"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="9360"/></w:tblGrid><w:tr><w:trPr><w:cantSplit/><w:tblHeader w:val="true"/></w:trPr><w:tc><w:tcPr><w:tcW w:type="dxa" w:w="9360"/><w:tcMar><w:top w:w="80" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:start w:w="120" w:type="dxa"/><w:end w:w="120" w:type="dxa"/></w:tcMar><w:vAlign w:val="center"/><w:shd w:fill="EAF2EC"/></w:tcPr><w:p><w:pPr><w:spacing w:before="40" w:after="60"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:color w:val="2F6B4F"/><w:sz w:val="22"/></w:rPr><w:t>Primary recommendation

Keep Shopify as the commerce system of record. Replace the public-facing theme with a Next.js headless storefront, store land-specific data in Shopify metafields/metaobjects, and hand checkout back to Shopify. This preserves products, orders, payments, and operational familiarity while allowing a complete UX rebuild.

Live-site note: inventory, third-party scripts, and page counts can change. Measured observations in this document reflect the public storefront on the audit date.


# Contents

1.  Executive recommendation and decisions2.  Current-state audit3.  Product strategy, users, and success metrics4.  New visual direction and page layouts5.  Functional product requirements6.  360-degree land-view specification7.  Shopify land data model8.  Technical architecture9.  SEO, accessibility, performance, security, and compliance10.  Migration and implementation plan11.  Antigravity build sequence12.  Testing, launch, risks, and source references


# 1. Executive Recommendation

The existing store has valuable inventory, financing programs, social proof, long operating history, and a working Shopify purchase path. The redesign should preserve that operational core while rebuilding how buyers discover, verify, compare, and purchase land.


## 1.1 Architecture decision

Decision

Recommendation

Why

Commerce backend

Retain Shopify

Avoid order, payment, product, and checkout migration risk.

Frontend

Next.js App Router

Server-rendered catalog pages, fast navigation, route control, and strong SEO.

Land content

Shopify metafields + metaobjects

Turn unstructured listing HTML into filterable, reusable fields.

Checkout

Shopify hosted checkout

Keep payment handling and checkout security with Shopify.

Account/loan portal

Link to existing portal in Phase 1

Do not replace loan servicing or authenticated account history during a storefront rebuild.

Search

Shopify first; Algolia/Typesense decision gate

Start lean, add a faceted index if inventory or response targets require it.

360 view

Photo Sphere Viewer v5, client-only

Supports equirectangular panoramas, gyroscope, markers, galleries, and tours.

Map

Mapbox or MapLibre provider decision

Needs clustered property pins, satellite/terrain, and parcel GeoJSON support.


## 1.2 Outcomes

- A trustworthy land marketplace that makes price, due-today amount, monthly payment, interest, term, taxes, access, utilities, and legal documents easy to understand.

- A search-first home page and filterable land catalog instead of a state-heavy navigation wall.

- A modern property detail page with gallery, 360-degree land view, interactive map, due-diligence center, and sticky purchase card.

- A faster and more accessible storefront with less third-party script clutter and a controlled motion system.

- A migration plan that preserves SEO equity, product handles, checkout, payment links, auctions, rewards, and customer operations until each dependency has a verified replacement.


## 1.3 Non-negotiable decisions before coding

- Approve Shopify as the system of record or explicitly authorize a full commerce migration. This PRD assumes Shopify remains.

- Approve one canonical contract-delivery promise. The live site currently references both 24 and 48 hours.

- Approve one support-hours statement and a primary phone number. The current experience exposes multiple numbers and both 24/7 and 9-5 claims.

- Confirm whether Webkul auctions, rewards, wishlist, chat, reviews, email capture, and the loan portal must remain at launch.

- Select the 360 media-production process. True 360 experiences require compatible panoramic media; ordinary listing photographs are not enough.

- Have U.S. legal counsel review financing disclosures, fees, refund language, boundary disclaimers, contact consent, and state-specific requirements before launch.


# 2. Current-State Audit

The current storefront is functional but behaves like a Shopify catalog layered with legacy content, multiple apps, and older land-listing HTML. The biggest opportunity is not simply visual polish; it is restructuring the product data and buyer journey.


## 2.1 What should be preserved

- Clear differentiators: guaranteed financing, no credit check, low down payments, online loan management, refund protection, and human support.

- A long history (founded in 2004), 55,000+ acres sold claim, customer reviews, educational material, and state/county/subdivision depth.

- Existing Shopify products, collections, checkout, multilingual URLs, customer entry points, and external loan/payment systems.

- Property maps, surveys, covenants, legal descriptions, coordinates, county context, and financing terms that already exist inside many listings.


## 2.2 Measured live-page snapshot

Surface

Observed signal

Impact

Home page

3,589 DOM nodes; 594 links; 228 images; 16 forms

High rendering and cognitive load, much of it from hidden menus/apps.

Home semantics

Empty H1; duplicate product H3 headings

Weak page hierarchy for screen readers and search engines.

Home images

207 images without useful alt text; 47 empty alt values

Major accessibility and image-SEO gap.

Arizona collection

203 images; 170 missing alt values; 33 products observed

Collection templates repeat the same accessibility issue.

Collection filters

Availability and price dominate

Buyers cannot filter by acreage, monthly payment, down payment, utilities, terrain, access, or use.

Example property

52 images; 39 missing alt values; 9 forms

The detail page is heavy and semantically noisy.

Runtime

Page JavaScript errors observed on home, collection, and product routes

Increases fragility and makes app conflicts harder to diagnose.

Navigation

135 collection links and 34 content-page links present in home DOM

The mega-menu and footer overwhelm users and crawlers.

Measured through a public desktop browser session on 27 August 2026. Values include hidden responsive/app markup and therefore describe page complexity, not only visible elements.


## 2.3 Critical UX and content findings

Severity

Area

Finding

Critical

Property detail template

Long legacy table-style content, inconsistent typography, broken images, and important facts buried below large media blocks.

Critical

Price model

Shopify's visible transactional price appears to be the amount due today, while the total land price is stored separately in content. Filters and structured data can therefore misrepresent price without a proper land schema.

Critical

Policy consistency

Contract delivery, support availability, phone numbers, and refund wording are not consistently presented across pages.

High

Discovery

The hero does not give users an immediate state, budget, acreage, or monthly-payment search.

High

Catalog cards

Titles are too long, finance facts are visually undifferentiated, and Summary/View Details calls to action are unclear.

High

Navigation

A flat list of states and large subdivision menus replaces task-based navigation.

High

Interruptions

Cookie consent, rewards, chat, sales notifications, and other overlays compete for the same screen area.

High

Performance risk

Numerous third-party hosts and duplicate app functionality increase script cost and error surface.

High

FAQ quality

Some FAQ links point to testing or myshopify domains; shipping/product wording is not appropriate for land contracts.

Medium

Trust narrative

The site has strong proof points, but they appear after long product grids and an external AI-link section that takes visitors away from the purchase journey.

Medium

Footer

Very large SEO link blocks, a stale copyright year, and repeated utility content reduce clarity.


## 2.4 Observed integration inventory

The public storefront loads or exposes Shopify commerce plus auction, chat, loyalty/rewards, wishlist, quick-view, reviews/social proof, advertising, analytics, surveys, cart-recovery, localization, and speed-optimizer scripts. Each must be classified before launch:

Disposition

Examples

Rule

Keep

Shopify checkout, customer/loan portal, required payment links, consent, core analytics

Retain until the replacement is proven in UAT.

Rebuild natively

Search, filters, wishlist, gallery, quick facts, forms, reviews presentation

Prefer first-party Next.js components and API adapters.

Compatibility spike

Webkul auctions, rewards/loyalty, multilingual behavior

Confirm headless API/webhook support before committing.

Retire or consolidate

Duplicate popups, redundant speed apps, overlapping chat/sales notifications

Remove unless a documented revenue or support owner justifies it.

Core problem statement

A buyer can find a lot, but must work too hard to understand whether it fits their budget, intended use, access needs, build plans, and due-diligence requirements. The rebuild should reduce uncertainty before asking for a down payment.


# 3. Product Strategy


## 3.1 Primary users

Persona

Main question

Required experience

First-time land buyer

Can I own this without bank qualification?

Plain-language finance summary, process guide, fees, and human help.

Off-grid / homestead buyer

Can I access, use, and build on it?

Utilities, zoning, restrictions, terrain, road access, weather, documents, and county links.

Recreation buyer

Is this suitable for camping, hunting, or a retreat?

Land-use tags, nearby recreation, travel directions, photos, map, and 360 view.

Investor

What is the total cost, location quality, and resale potential?

Cash/finance comparison, taxes, parcel data, comps disclaimer, and documents.

Existing customer

How do I pay, see my balance, or get help?

Unambiguous account, payment, contract, and support routes.

OLS administrator

How do I publish a complete listing safely?

Structured fields, required-field validation, media status, and preview workflow.


## 3.2 Goals

- Get a qualified visitor from home page to a relevant property in no more than three interactions.

- Make the total price, due-today amount, monthly payment, interest, term, taxes, and fees distinguishable at a glance.

- Give every property a consistent due-diligence checklist and document center.

- Make 360-degree viewing a first-class, optional media mode with a fast fallback.

- Preserve or improve organic visibility for existing state, county, subdivision, product, and learning-center URLs.

- Pass Core Web Vitals, WCAG 2.2 AA, mobile usability, and purchase-flow QA before launch.


## 3.3 Explicit non-goals for Phase 1

- Replacing Shopify checkout, order management, taxes, or payment processing.

- Replacing the existing loan-servicing/account portal or migrating historical account balances.

- Automating title verification, legal advice, county approvals, or survey certification.

- Generating true 360 media from ordinary images.

- Launching a native mobile app, CRM replacement, or full customer social network rebuild.


## 3.4 Success metrics

Metric

Initial target

Measurement

Home to listing engagement

+25% vs. baseline

Search/filter/map interaction and collection click-through.

Listing to property detail

+20% vs. baseline

Property-card click-through.

Property to cart/lead

+15% vs. baseline

Add-to-cart plus qualified contact/schedule events.

Checkout completion

+10% vs. baseline

Shopify checkout completion for land reservation products.

Due-diligence engagement

Track, then optimize

Document, map, 360, financing calculator, and county-link events.

Core Web Vitals

Pass at p75 mobile

LCP &lt;= 2.5 s, INP &lt;= 200 ms, CLS &lt;= 0.10.

Accessibility

0 critical defects

Automated scan plus manual keyboard/screen-reader test.

Migration quality

No material organic loss

404s, indexed pages, canonical coverage, traffic, and conversions.


# 4. New Design Direction and Layout

Design concept: Open Ground

A modern, calm, outdoors-first marketplace that feels more like a trusted real-estate platform than a general online store. Large authentic land imagery, clear numbers, measured spacing, strong document transparency, and restrained motion should do the persuasion.


## 4.1 Visual system

Token

Recommendation

Use

Primary ink

#102633

Headers, navigation, body emphasis.

OLS blue

#5E82AE

Links, primary interface accents, finance trust cues.

Evergreen

#2F6B4F

Availability, positive status, land identity.

Warm sand

#F4EFE5

Section backgrounds and editorial areas.

Hot-lot clay

#C4653D

Limited use for auctions, hot lots, and urgent labels.

Canvas

#FAFBF8

Main page background.

Typography

Manrope + Source Serif 4

Manrope for UI/numbers; Source Serif 4 for occasional editorial headings.

Grid

12 columns, 1,280 px max

24 px desktop gutters; 16 px mobile gutters; 8 px spacing system.

Radius

12-18 px

Cards and media; avoid excessive pill-shaped containers.

Imagery

4:3 cards, 16:9 hero, full-bleed 360

Use real parcel media before generic stock landscapes.


## 4.2 Motion system (GSAP)

- Use @gsap/react useGSAP() for automatic context cleanup in client components.

- Home hero: short headline/search reveal and subtle background scale. Do not rely on a blocking autoplay video.

- Sections: 16-24 px vertical reveal, 0.45-0.70 second duration, low stagger, and no animation that delays reading or clicking.

- Map/list: animate selection state and card-pin synchronization, not the entire result set on every filter change.

- Property page: use crossfade/slide for gallery and panel changes. Do not animate finance numbers in a way that makes them hard to compare.

- 360 viewer: let the WebGL viewer own pan/zoom. GSAP may animate the viewer shell and hotspot details, not camera controls.

- Respect prefers-reduced-motion. Disable decorative motion, auto-rotation, and parallax when requested.

- Use CSS transitions for routine hover/focus states; reserve GSAP for coordinated sequences and scroll-linked storytelling.


## 4.3 Global header and navigation

Zone

Desktop

Mobile

Utility bar

Call/Text, support hours, Make a Payment, Account

One support button plus Account; payment in menu.

Main bar

Logo, Browse Land, Map Search, Hot Lots, How It Works, Learn, About

Logo, Search, Saved, Menu.

Search

Expandable universal search with state/county/property suggestions

Full-screen search sheet with large tap targets.

Cart

Reservation cart icon with item count

Sticky icon and safe-area spacing.

Mega menu

Task-based: By State, By Monthly Payment, By Acreage, By Use

Accordion groups; do not inject every subdivision visibly.


## 4.4 Home page layout

Order

Section

Layout / content

1

Hero + property finder

Headline: Own land without the bank. Search State/County, budget per month, acreage, and use. Primary CTA: Browse Land. Secondary: How Financing Works.

2

Trust rail

Since 2004, 55,000+ acres sold, guaranteed financing, refund evaluation, human support. Every claim links to details.

3

Hot lots

Six concise property cards with price/down/monthly labels and one clear View Property action.

4

Map discovery

Interactive U.S. map with clusters, state summary, and List/Map switch.

5

How buying works

Reserve online, sign contract, use/manage land. Show exact service-level promise after approval.

6

360 experience

A real embedded sample panorama explaining how buyers can inspect terrain remotely.

7

Shop by goal

Homestead, recreation, investment, build later, off-grid, adjoining lots.

8

Financing calculator

Budget-first tool with approved assumptions and direct matching properties.

9

Proof

Customer reviews, photos, transparent guarantee, and service outcomes.

10

Learn before you buy

Guides to access, utilities, taxes, building, surveys, and owner financing.

11

Final CTA

Browse land or talk to a land specialist; concise newsletter option below.


## 4.5 Browse land / collection layout

- Persistent search summary: location, price/monthly budget, acreage, and result count.

- Filter drawer/sidebar: status, state, county, subdivision, acreage range, total price, monthly payment, down payment, cash/financed/auction, road access, utilities, terrain, intended use, adjoining lots, and 360 available.

- Active filter chips with Clear All; shareable query-string URLs; back-button-safe state.

- Grid/List/Map toggle. Desktop may show a split map; mobile uses a full-screen map sheet.

- Sort by recommended, newest, monthly payment, total price, acreage, and price per acre where valid.

- Card content: one image, status badges, concise title, state/county, acres, total price, due today, monthly payment, key utilities/access tags, save, and View Property.

- Empty state explains which filters caused zero results and suggests the nearest alternatives.

- Pagination or controlled Load More; do not infinite-scroll without URL/history support.


## 4.6 Property detail page layout

Area

Required layout

Above fold

Breadcrumb, concise property name, status, save/share, gallery/360/media tabs, sticky purchase/finance card.

Finance card

Total price, amount due today, monthly payment, interest/APR language, term, payment-plan selector, fees link, guarantee summary, Add to Cart.

Quick facts

Acres, parcel/APN, state/county/subdivision, zoning, terrain, access, utilities, taxes, time to build.

360 + map

Immersive panorama, capture date, hotspots, parcel map, access point, boundary disclaimer, directions.

Due diligence

Survey, covenants, legal description, taxes, buildability/zoning, title/deed context, county contacts, last-verified dates.

Description

Short structured narrative followed by nearby places and intended-use guidance.

Buying process

Property-specific three-step flow and contract-delivery promise.

FAQ

Property-specific questions first; general financing questions second.

Related

Comparable nearby lots and alternative monthly budgets.

Mobile

Sticky bottom Reserve/Buy action with price context; no overlay should cover it.


## 4.7 Supporting pages

Page

New treatment

How It Works

Short guided sequence, financing choices, contract/deed flow, taxes, guarantee, and FAQs. Break the current long page into anchored sections.

Financing

Approved rates/terms, calculator, fee table, early-payoff rule, refinance options, and plain-language examples.

Guarantee

Eligibility, cash vs. financed window, principal/interest/fee treatment, exclusions, request process, and support CTA.

Learning Center

Searchable article hub grouped by Buying, Financing, Visiting, Building, Ownership, and Off-grid.

Contact

One primary number, support hours, message form, schedule call, existing-customer path, consent language.

Make a Payment

Separate existing-customer destination with verified payment methods; clearly distinguish from buying a new property.

Account

Phase 1 deep link to the existing customer account/loan portal with explanatory transition.

FAQ

Land-specific accordion with search and categories; remove generic shipping/product language and legacy test links.


# 5. Functional Product Requirements

Priority uses MoSCoW: Must is launch-blocking; Should is expected in the first production release unless a dependency blocks it; Could is a later enhancement.


## 5.1 Navigation and discovery

ID

Priority

Requirement / acceptance

NAV-01

Must

Desktop and mobile navigation expose Browse Land, Map Search, Hot Lots, How It Works, Learn, About, Account, Payment, and Contact without listing every subdivision at once.

NAV-02

Must

Universal search returns properties, states, counties, subdivisions, and learning articles with keyboard support.

NAV-03

Must

Legacy product, collection, page, and blog URLs resolve directly or through mapped 301 redirects.

NAV-04

Should

Users can save properties locally when signed out and retain/migrate the list after account authentication if supported.

NAV-05

Must

Breadcrumbs appear on collection, county, subdivision, product, and article pages and emit BreadcrumbList schema.


## 5.2 Catalog, filters, and map

ID

Priority

Requirement / acceptance

CAT-01

Must

Every available lot renders from structured fields; templates must not parse finance facts from rich-text descriptions.

CAT-02

Must

Filters cover location, acreage, total price, monthly payment, down payment, payment type, status, utilities, access, terrain, use, and 360 availability.

CAT-03

Must

Filter state is encoded in the URL, shareable, reversible with Back/Forward, and server-renderable where indexable.

CAT-04

Must

Property cards use one concise canonical title and never duplicate headings in the DOM.

CAT-05

Must

Map markers cluster, synchronize with cards, and expose an accessible list alternative.

CAT-06

Must

Sold properties show Sold and a waitlist CTA, never an active purchase button.

CAT-07

Should

Comparison supports up to four properties across finance and due-diligence fields.

CAT-08

Should

Search results can be ranked by availability, merchandising priority, data completeness, and user filters.


## 5.3 Property details and trust

ID

Priority

Requirement / acceptance

PDP-01

Must

Total price, due-today amount, monthly payment, down payment, rate, term, and early-payoff rule are individually labeled and sourced from structured fields.

PDP-02

Must

Quick facts never show an unverified claim as confirmed. Each field supports Unknown, Not available, or Verify with county.

PDP-03

Must

Documents have titles, file type/size, last-verified date, and accessible download/open behavior.

PDP-04

Must

Coordinates and parcel boundary data render on a map; approximate overlays carry a visible disclaimer.

PDP-05

Must

Broken media displays a controlled fallback; a listing cannot publish with a missing primary image.

PDP-06

Must

Contact CTA passes the property code/URL without exposing user data in query strings.

PDP-07

Should

Financing calculator updates approved scenarios without altering the authoritative checkout price.

PDP-08

Should

Related properties favor same county/subdivision and similar budget/acreage.


## 5.4 Cart, checkout, auctions, and accounts

ID

Priority

Requirement / acceptance

COM-01

Must

Cart line item names the property, plan, total land price, amount charged now, and next-payment summary.

COM-02

Must

Checkout starts from a Shopify Cart API checkoutUrl and completes in Shopify hosted checkout.

COM-03

Must

Required terms/consent are versioned, logged, and presented before checkout handoff without pre-checked boxes.

COM-04

Must

A sold/reserved state prevents two buyers from purchasing the same lot; race-condition behavior is tested.

COM-05

Must

Post-checkout confirmation explains contract delivery, next payment, account setup, and support.

COM-06

Must

Auction items use a separate tested flow. If the current auction provider lacks headless support, retain its hosted route for Phase 1.

ACC-01

Must

Account and Make a Payment routes clearly identify when the user is leaving the storefront for an approved external portal.

ACC-02

Should

Customer Account API/SSO is a later enhancement after existing account and loan identity mapping is validated.


## 5.5 Content, marketing, and administration

ID

Priority

Requirement / acceptance

CMS-01

Must

Admins edit property facts through defined fields, not raw HTML tables.

CMS-02

Must

Publishing validation blocks missing property code, location, finance facts, primary image, availability, legal description, and required disclaimer fields.

CMS-03

Must

English is launch-complete; Spanish and French launch only after human-reviewed content and URL/hreflang QA.

MKT-01

Must

GA4/GTM and advertising pixels load through consent rules and emit a documented commerce/land event taxonomy.

MKT-02

Must

Newsletter and contact forms include consent language, spam protection, validation, and success/error states.

MKT-03

Must

Only one intrusive overlay may be active at a time; cookie consent has priority and never covers the primary mobile CTA.

MKT-04

Should

Property alerts allow state/county/budget preferences and back-in-stock notification.

OPS-01

Must

Shopify webhooks trigger cache revalidation and search-index updates; failures are logged and retryable.


# 6. 360-Degree Land View Specification

Scope clarification

The viewer can display true 360 panoramas, 360 video, cubemaps, and multi-scene tours. It cannot create missing scene coverage from normal photos. Media capture and calibration are operational dependencies, not front-end features.


## 6.1 Recommended implementation

- Use Photo Sphere Viewer v5 with @photo-sphere-viewer/core.

- Load the viewer through next/dynamic with SSR disabled. Render an optimized poster and button in the server-rendered page.

- Use official Markers, Compass, Gallery, Gyroscope, Visible Range, Resolution, and Virtual Tour plugins only when needed.

- Start with 2:1 equirectangular panoramas. For very large source images, use tiled equirectangular or cubemap adapters to control memory and bandwidth.

- Store panorama metadata in a Shopify metaobject and reference it from the property product.

- Keep map parcel boundaries in GeoJSON. A manually calibrated panorama polygon is a visual aid, not a survey.


## 6.2 Viewer user experience

Feature

Behavior / acceptance

Entry

Gallery tabs: Photos, 360 View, Map, Documents. 360 tab shows a poster and explicit Enter 360 View action.

Controls

Drag, pinch, mouse wheel/zoom buttons, keyboard arrows, fullscreen, reset view, compass, and help.

Gyroscope

Available on compatible HTTPS mobile devices after user action/permission; normal touch controls always remain.

Hotspots

Tooltip plus detail panel for road access, corners, utilities, views, nearby roads, water/features, and next scene.

Multiple scenes

Gallery or virtual-tour nodes with named capture points and a small plan/map showing position.

Boundaries

Optional polygon/polyline overlay marked Approximate. Survey and legal description remain authoritative.

Context

Show capture date, source, weather/season note, location label, and orientation/compass.

Fallback

If WebGL, device motion, or panorama media fails, show normal photos, map, and a readable message.

Motion

No forced auto-rotate by default. If enabled for a demo, stop on interaction and honor reduced-motion.

Analytics

Track viewer opened, fullscreen, gyro, hotspot selected, scene changed, and viewer error.


## 6.3 Panorama data fields

Field

Type

Rule

label

Text

Human-readable capture point, e.g. North access road.

panorama_file/url

File or URL

Required equirectangular/cubemap/tile source on approved CDN.

poster_image

Image

Required responsive fallback and initial paint.

source_type

Enum

equirectangular, tiled, cubemap, 360_video, external_street_view.

initial_yaw/pitch/fov

Number

Approved initial camera view.

north_offset

Number

Compass calibration in degrees.

gps

Latitude/longitude

Capture position; not necessarily parcel centroid.

captured_at

Date

Required to prevent presenting outdated terrain as current.

hotspots

List of metaobjects

Sanitized labels, yaw/pitch or texture coordinates, type, details, optional linked scene.

boundary_overlay

Polygon points

Optional and explicitly approximate.

alt_description

Text

Non-visual description of scene, terrain, access, and notable features.

status

Enum

draft, approved, unavailable, retired.


## 6.4 Media and performance rules

- Do not download the viewer JavaScript or panorama until the user enters the 360 experience or the component is intentionally prefetched near viewport.

- Serve the poster through Next/Image. Serve panorama assets from a CDN with immutable caching and correct CORS headers.

- Set practical desktop/mobile resolution tiers. Test memory on mid-range iOS and Android devices, not only flagship phones.

- Use a loading progress indicator and an error boundary. A viewer failure must never block pricing, documents, map, or checkout.

- Do not include large 360 assets in the LCP path. The normal property hero must remain the LCP candidate.

- Sanitize any hotspot HTML or render structured React content instead of untrusted HTML strings.


## 6.5 360 acceptance criteria

- A property with an approved panorama exposes a visible 360 badge on its card and media tab on its detail page.

- A property without 360 media has no empty tab or broken placeholder.

- Viewer works with mouse, touch, keyboard, and screen-reader-adjacent controls; all buttons have accessible names and visible focus.

- Gyroscope appears only when supported and never becomes the only control method.

- Approximate boundary overlays are visibly labeled and can be toggled off.

- Opening/closing the viewer does not leak WebGL contexts or event listeners during route changes.

- A failed panorama request produces a useful fallback in under five seconds and logs a non-sensitive diagnostic event.

- Lighthouse/CWV tests remain within the agreed property-page performance budget before the viewer is opened.


# 7. Shopify Land Data Model

Use one Shopify product per unique lot or sale unit. Use variants for purchasable plans only when each plan can be represented accurately in checkout. Do not create variants for non-purchasable display choices.


## 7.1 Product and availability model

Entity

Purpose

Notes

Product

Unique parcel/lot or adjoining-lot package

Handle remains stable; product code is immutable.

Variant

Cash, financed reservation, same-as-cash 30/60, auction deposit

Variant price is the amount charged now; full economics live in structured fields.

Collection

State, county, subdivision, Hot Lots, sold archive

Use collections for merchandising and SEO, not as the only taxonomy.

Metaobject

Reusable panorama, document, payment plan, FAQ, nearby place, county profile

Expose only approved definitions to Storefront API.

Inventory/status

Available, reserved, sold, auction, waitlist, hidden

One authoritative availability state; sync with purchase events.


## 7.2 Core product metafields

Group

Fields

Identity

property_code, display_title, status, sale_type, featured_priority

Location

state, county, subdivision, city/nearest_town, postal_code, latitude, longitude, access_point

Parcel

apn/parcel_number, legal_description, acres, lot/block/unit, parcel_geojson, survey_status

Land

terrain, elevation, road_access, road_surface, zoning, time_to_build, intended_uses, adjoining_lots

Utilities

power, water, sewer/septic, gas, internet/cell, utility_notes, verification_date

Finance

total_price, cash_price, down_payment, amount_due_today, monthly_payment, interest_rate, term_months, early_payoff_discount

Ownership cost

annual_property_tax, tax_year, documentation_fee, admin_fee, payment_fee_notes

Protection

refund_window_days, refund_scope, guarantee_summary, conditions_url/version

Media

primary_image, gallery, panorama_refs, video, map_poster, alt_text_status

Documents

survey_ref, covenant_ref, plat_ref, sample_contract_ref, county_links, deed/title_note

Content

short_summary, full_description, highlights, nearby_places, property_faqs, last_verified_at

SEO

seo_title, seo_description, canonical_override, image_alt, index_status


## 7.3 Data integrity rules

- Money is stored in numeric/money fields, never parsed from titles or HTML descriptions.

- Product title is concise; marketing labels such as 50% Off or $0 Down are structured badges, not part of the canonical name.

- A property cannot be Available if its purchase variant is unavailable or its status is Sold/Reserved.

- Coordinates, parcel boundary, survey, and legal description are independently tracked and dated.

- Unknown values are explicit. The UI must not convert missing data into None, No restrictions, or Utilities available.

- Every editable policy field carries a version or effective date where it affects purchase consent.

- All migration transformations produce a field-level exception report for human review.


# 8. Technical Architecture


## 8.1 Recommended stack

Layer

Technology

Implementation rule

Framework

Next.js App Router + TypeScript strict

Server Components by default; Client Components only for interactivity.

UI

Tailwind CSS v4 + design tokens

Reusable components; no repeated arbitrary styles for core patterns.

Motion

GSAP + @gsap/react

Scoped useGSAP, ScrollTrigger only where useful, cleanup and reduced-motion.

Commerce

Shopify Storefront API client

Pin a supported API version; query products/collections/cart on the server.

Checkout

Shopify Cart API checkoutUrl

Handoff to hosted checkout; never collect card data in Next.js.

Content

Shopify products, metafields, metaobjects, blogs/pages

Keep one admin system in Phase 1.

360

Photo Sphere Viewer v5

Dynamic client import, plugins on demand, CDN panorama assets.

Map

Mapbox GL or MapLibre

Clustered markers, satellite/terrain, GeoJSON, list fallback.

Forms

Server Actions/Route Handlers + Zod

Validate server-side, rate limit, consent log, CRM/email adapter.

Observability

Sentry + platform logs + analytics

No PII in errors; trace webhook and checkout handoff failures.

Testing

Vitest, React Testing Library, Playwright

Unit, component, accessibility, visual, and full purchase-flow tests.

Hosting

Vercel recommended

Preview deployments, protected environment variables, rollback-ready releases.


## 8.2 System flow

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>1.<w:t>A visitor requests a page. Next.js renders catalog/content from Shopify through server-side GraphQL queries and cached data.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>2.<w:t>The browser receives minimal interactive JavaScript for filters, map, cart drawer, GSAP sections, and the optional 360 viewer.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>3.<w:t>Cart mutations go to Shopify through a server-side commerce adapter. The resulting checkoutUrl sends the buyer to Shopify hosted checkout.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>4.<w:t>Shopify product/order webhooks call verified Next.js route handlers, which revalidate content and update any external search index.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>5.<w:t>Account, loan servicing, and approved payment tools remain external Phase 1 systems reached through clearly labeled transitions.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>6.<w:t>Analytics receives consented events with property code, state, county, acreage band, plan type, and funnel stage - never sensitive loan or payment data.


## 8.3 Rendering and caching strategy

- Server-render home, collections, state/county pages, products, and learning articles for crawlability and fast first paint.

- Use tag-based or framework-native revalidation keyed by product, collection, and content type. Webhooks invalidate affected tags.

- Stream non-critical sections behind stable skeletons; do not shift the purchase card or hero dimensions.

- Use Next/Image with explicit sizes and Shopify CDN parameters for normal media. Do not route huge panorama files through the image optimizer.

- Lazy-load map, chat, reviews widgets, finance calculator, and 360 viewer. No third-party widget belongs in the critical rendering path unless proven necessary.

- Cache public product/collection data, not user carts, account information, consent, or personalized checkout state.


## 8.4 Suggested repository structure

src/  app/    (storefront)/page.tsx    collections/[handle]/page.tsx    products/[handle]/page.tsx    land/page.tsx    map/page.tsx    cart/page.tsx    how-it-works/page.tsx    financing/page.tsx    guarantee/page.tsx    learning-center/[handle]/page.tsx    contact/page.tsx    make-a-payment/page.tsx    api/webhooks/shopify/route.ts  components/    commerce/  property/  search/  map/  panorama/  motion/  content/  lib/    shopify/  search/  analytics/  validation/  seo/  maps/  types/  styles/tests/  unit/  component/  e2e/  visual/scripts/  migrate/  audit/  redirects/


## 8.5 Environment and secrets

Variable group

Examples

Rule

Shopify

store domain, pinned API version, Storefront token, webhook secret

Private tokens/secrets stay server-only; validate webhook HMAC.

Map

public map token or tile endpoint

Restrict token by domain and capability where provider supports it.

Search

application ID, public search key, admin key

Admin key server-only; optional until search decision gate.

Analytics

GTM/GA IDs, Meta pixel, consent configuration

Load only according to approved consent categories.

Forms

email/CRM endpoint, rate-limit store, CAPTCHA/Turnstile keys

Never expose private send keys in the client.

Monitoring

Sentry DSN/auth, release name

Scrub PII and payment/account data.


# 9. Non-Functional Requirements


## 9.1 Performance budgets

Budget

Target

Core Web Vitals

p75 mobile: LCP &lt;= 2.5 s, INP &lt;= 200 ms, CLS &lt;= 0.10.

Initial JS

Keep route-specific client JavaScript minimal; define and enforce a bundle budget in CI.

Images

Responsive dimensions, modern formats, no below-fold eager images, no missing width/height.

Maps/360

Not in initial critical path; load after intent or controlled viewport threshold.

Third-party

Each script has an owner, purpose, consent category, load strategy, and retirement review.

Error rate

No uncaught application errors in tested primary routes and funnel.


## 9.2 Accessibility

- Meet WCAG 2.2 AA across navigation, filters, cards, map alternative, cart, forms, media, and content.

- Use one descriptive H1 per page and a logical heading ladder. No empty or duplicated semantic headings.

- All meaningful property images have specific alt text; decorative images use empty alt intentionally.

- Every form field has a visible label, instructions, programmatic errors, and focus management.

- Interactive elements meet target size and visible focus requirements. No hover-only information.

- Map and 360 experiences have accessible list/text alternatives. Gyroscope and drag are never required to obtain essential facts.

- Motion honors reduced-motion; content does not flash, auto-scroll, or trap focus.


## 9.3 SEO and structured data

- Preserve existing canonical product/collection routes at launch or ship a tested one-to-one redirect map before changing them.

- Generate unique titles/descriptions for states, counties, subdivisions, properties, and articles from structured fields.

- Use Product/Offer where accurate, plus Organization, WebSite, BreadcrumbList, Article, and visible FAQPage markup. Do not claim unsupported rich-result eligibility.

- Generate XML sitemaps by content type, remove sold/retired content only by policy, and prevent parameter/filter index bloat.

- Maintain English/Spanish/French hreflang only for complete translated equivalents; use self-canonical URLs.

- Ship robots, canonical, Open Graph, Twitter card, image alt, and noindex controls from a central SEO module.

- Monitor 404s, redirects, index coverage, duplicate titles, canonical conflicts, and organic conversions after cutover.


## 9.4 Security and privacy

- Keep card collection and final payment in Shopify or the existing approved payment provider; the Next.js site must not handle raw card data.

- Validate and sanitize all inputs; rate-limit public forms and webhook endpoints; verify webhook signatures.

- Apply Content Security Policy, secure headers, least-privilege tokens, secret rotation, and dependency scanning.

- Do not place emails, phone numbers, account IDs, property inquiries, or cart tokens in analytics URLs.

- Consent manager controls advertising/analytics scripts and records the active policy version.

- Document data retention and deletion routes for leads, alerts, wishlist/account, and marketing preferences.


## 9.5 Legal and real-estate transparency gates

- Approved counsel reviews all financing rate/term/APR representations, fees, no-credit-check language, early-payoff discount, and refinance claims.

- Property boundaries, maps, aerial imagery, and panorama overlays state whether they are approximate and direct buyers to authoritative surveys/legal descriptions.

- Buildability, utilities, road access, zoning, taxes, and intended-use content identifies source and last verification where available.

- Guarantee and refund language distinguishes principal, interest, fees, cash purchases, financed purchases, timing, conditions, and exclusions.

- Contact/SMS/email forms use approved consent language and opt-out instructions.

- The UI must never imply that the website is a substitute for county confirmation, a survey, title work, or legal advice.


# 10. Migration and Implementation Plan

Estimated duration: 8-10 weeks for one strong AI-assisted full-stack engineer with timely business, content, and legal decisions. A small design/engineering/QA team can target 6-8 weeks. The schedule excludes creating 360 media for every property and replacing loan servicing.


## 10.1 Delivery phases

Phase

Timing

Deliverables

Exit gate

0. Discovery

Week 1

Access, app inventory, analytics baseline, content export, policy decisions, 360 sample assets

Architecture and decision register approved.

1. Foundation

Week 1-2

Repo, CI, Next.js, Tailwind tokens, layout shell, Shopify adapter, preview environment

Build/deploy/test pipeline green.

2. Data model

Week 2-3

Metafield/metaobject definitions, migration scripts, validation report, sample listings

Ten representative lots render correctly.

3. Discovery

Week 3-5

Home, collection/state/county, search, filters, property cards, list/map

Search/filter URLs and map sync pass UAT.

4. Property + 360

Week 4-6

New PDP, finance card, due diligence, documents, gallery, 360 viewer, related lots

Representative cash/finance/sold/auction lots pass.

5. Commerce

Week 6-7

Cart, checkout handoff, confirmation, account/payment transitions, forms, learning pages

Sandbox purchase and support journeys pass.

6. Quality

Week 7-8

SEO, redirects, accessibility, performance, analytics, security, visual regression

Launch scorecard meets blocking thresholds.

7. UAT/cutover

Week 8-9

Content freeze, delta sync, stakeholder UAT, DNS/domain cutover, rollback plan

Business, legal, content, engineering sign-off.

8. Stabilization

Week 9-10

48-hour intensive monitoring, bug triage, search/analytics review, iteration backlog

No critical incidents; baseline report delivered.


## 10.2 Migration workstream

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>1.<w:t>Export Shopify products, variants, collections, pages, blogs, files, redirects, metafields, and current app dependencies. Keep a timestamped backup.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>2.<w:t>Create a canonical URL inventory and classify each route: retain, redesign on same path, redirect, archive, noindex, or remove.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>3.<w:t>Parse legacy product content into a staging dataset. Map financing, location, parcel, tax, utility, access, document, and media values to structured fields.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>4.<w:t>Run exception reports for missing/ambiguous values. Human reviewers approve data; scripts do not infer legal or buildability facts.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>5.<w:t>Upload or reference cleaned media, add alt text, remove broken assets, and identify properties ready for 360 media.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>6.<w:t>Migrate approved fields to Shopify metafields/metaobjects in small batches; verify sample products before bulk update.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>7.<w:t>Build and test the redirect map. Preserve query-independent product handles and canonical URLs where possible.

<w:tab w:pos="605" w:val="left"/></w:tabs><w:spacing w:after="160" w:line="280" w:lineRule="auto"/><w:ind w:left="605" w:hanging="605"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:t>8.<w:t>Freeze content shortly before launch, run a delta sync, verify checkout/availability, and retain a rollback path to the Shopify theme.


## 10.3 Key implementation tickets

Epic

Tickets

Foundation

Project setup; strict lint/typecheck; CI; preview deploy; design tokens; layout; error boundaries; analytics consent shell.

Shopify

GraphQL client; fragments; caching; cart mutations; checkout handoff; webhooks; metafield mapping; error taxonomy.

Catalog

Search bar; filter schema; query URL state; cards; pagination; sort; sold/waitlist; saved properties.

Map

Provider spike; clusters; card sync; satellite/terrain; GeoJSON; mobile map sheet; accessible list.

PDP

Media gallery; quick facts; finance plans; due diligence; document list; related properties; sticky mobile CTA.

360

Dynamic viewer; poster; plugins; hotspots; virtual tour; gyro; reduced motion; fallback; analytics; cleanup tests.

Commerce

Cart drawer/page; consent/versioning; duplicate-sale protection; confirmation; analytics; recovery behavior.

Content

How It Works; Financing; Guarantee; FAQ; Learning Center; Contact; Account; Payment transitions.

Quality

SEO metadata/schema; sitemap/robots; redirects; a11y; CWV; visual regression; security review; UAT fixtures.


## 10.4 Definition of done per ticket

- Requirements and error/empty/loading states are implemented, not left as TODOs.

- Responsive behavior is verified at 360, 390, 768, 1024, 1280, and 1440 px widths.

- Keyboard, focus, labels, contrast, reduced-motion, and accessible-name checks pass.

- Unit/component tests cover business logic; E2E covers the related user flow.

- No uncaught console error, TypeScript error, lint error, broken image, or failed network request remains in the tested path.

- Analytics event and data payload are documented and verified under consent rules.

- Performance impact is measured; heavy components are lazy and do not shift layout.

- Content owner and, where needed, legal reviewer approve user-facing claims.


# 11. Antigravity Build Sequence

Operating rule

Do not ask Antigravity to generate the entire production site in one pass. Give it one milestone at a time, require tests and a browser verification report, then commit the milestone before moving forward.


## 11.1 Master project prompt

Build a production-ready headless storefront for Online Land Sales.Stack: Next.js App Router, TypeScript strict, Tailwind CSS, GSAP with @gsap/react,Shopify Storefront API, Shopify hosted checkout, and Photo Sphere Viewer v5.Business goal: help buyers find, evaluate, and reserve seller-financed U.S. land.Preserve existing Shopify products, collections, orders, checkout, and legacy URLs.Use structured land metafields/metaobjects; never parse price, finance, parcel, utility,access, or legal facts from rich text at render time.Required experiences: search/filter/list/map, modern property cards, transparent financesummary, due-diligence documents, property map, optional 360-degree panorama withhotspots/gyro/fallback, cart, Shopify checkout handoff, account/payment transitions,content pages, analytics consent, SEO, WCAG 2.2 AA, and Core Web Vitals.Server Components by default. Lazy-load map, GSAP-heavy sections, chat, and 360 viewer.Honor reduced motion. Do not expose secrets or collect payment cards. Add tests andverify every milestone in a real browser. Stop and request a decision when a policy,integration, or data field is ambiguous; never invent land or financing facts.


## 11.2 Milestone prompts

Milestone

Instruction

M1 - Foundation

Create the repo architecture, design tokens, responsive shell, CI, lint/typecheck/test scripts, error boundaries, consent shell, and preview deployment. No mocked production API calls.

M2 - Shopify adapter

Implement typed Storefront API client, fragments, products/collections, metafields/metaobjects, caching, errors, fixtures for tests, and webhook revalidation.

M3 - Catalog

Build home finder, catalog, filter URL state, cards, sorting, pagination, sold/waitlist behavior, and saved state. Verify 360/390 px mobile layouts.

M4 - Map

Implement provider adapter, clustered markers, list/map synchronization, GeoJSON boundaries, mobile map sheet, accessible list fallback, and provider error state.

M5 - PDP

Build the property detail hierarchy, finance card, quick facts, documents, map, related lots, sticky mobile CTA, and structured data.

M6 - 360

Implement dynamic Photo Sphere Viewer, poster, markers, compass, gallery/tour, gyro, boundary disclaimer, analytics, fallback, cleanup, and memory/performance tests.

M7 - Commerce

Implement cart, terms versioning, Shopify checkoutUrl handoff, sold-race handling, confirmation, account/payment transitions, and sandbox E2E flow.

M8 - Content/quality

Rebuild support pages, migrate content, add redirects, metadata/schema/sitemap, accessibility, performance, security, analytics QA, and launch scorecard.


## 11.3 Required Antigravity verification response after each milestone

- Files created/changed and why.

- Commands run with pass/fail results: install, lint, typecheck, unit/component tests, build, and relevant E2E tests.

- Browser routes and responsive widths tested, with any remaining defects listed explicitly.

- Accessibility, console/network errors, and performance impact.

- Assumptions made and decisions still required.

- Rollback or migration risk introduced by the milestone.


# 12. Testing and Launch Plan


## 12.1 Required test matrix

Test type

Coverage

Unit

Money/finance formatting, filter serialization, status logic, field mapping, schema generation, panorama config validation.

Component

Cards, filters, finance card, documents, consent, forms, cart rows, viewer shell, empty/error states.

E2E

Search to PDP; cash/finance add to cart; checkout handoff; sold lot; waitlist; contact; account/payment; language; 360 fallback.

Accessibility

Automated axe plus keyboard and screen-reader checks for header, filters, map alternative, PDP, forms, cart, and 360 controls.

Visual

Home, catalog, state, map, PDP variants, content pages, cart, and error pages across approved breakpoints.

Performance

Cold/warm mobile tests, slow network, image-heavy PDP, map opened, 360 opened, and third-party consent states.

SEO

Status/canonical/hreflang/schema/sitemap/robots/redirects, duplicate metadata, pagination, filter parameters, sold routes.

Security

Secrets, headers/CSP, dependency scan, webhook signature, rate limits, input validation, PII/log review.

Data

Representative properties for each state, cash/finance/auction/sold/zero-down, missing utility, documents, 360/no-360.


## 12.2 Launch checklist

- Business owners approve support hours, phone numbers, contract SLA, fees, guarantee, and payment methods.

- Legal approves financing, consent, refund, privacy, terms, mapping/boundary, and property-information disclaimers.

- All available properties pass the required-field and media validation report.

- Checkout and auction paths are tested with real sandbox/test products and approved integrations.

- Redirect map, canonicals, sitemaps, robots, hreflang, and Search Console properties are ready.

- GA4/GTM, ad pixels, consent states, and conversion events are verified without duplicate firing.

- CWV, WCAG, device/browser, console/network, and security gates pass.

- DNS, environment variables, webhook endpoints, monitoring, alerts, backups, and rollback steps are documented.

- Content freeze and final delta migration are complete; old Shopify theme remains available for rollback.

- Support team has the new-site runbook and knows how to identify property, cart, checkout, account, and 360 issues.


## 12.3 Post-launch monitoring

- First 48 hours: checkout failures, sold/reserved conflicts, 404s, API errors, webhook failures, form delivery, map/360 errors, CWV, and support tickets.

- First 14 days: search terms, zero-result filters, card/PDP conversion, finance-plan selection, document/360 use, abandonment, and mobile issues.

- First 30 days: organic impressions/clicks, canonical/index coverage, state/county landing performance, top exit pages, and comparison against the pre-launch baseline.

- Do not add new third-party scripts during stabilization unless they address a documented critical issue.


# 13. Risks, Dependencies, and Decision Register

Risk / decision

Impact

Mitigation / owner action

Shopify vs. full migration

Very high

Approve Shopify-retained architecture before code. Full migration requires a separate SOW.

Unstructured legacy data

Very high

Field mapping, exceptions, human validation, staged migration.

360 media unavailable

High

Launch viewer only on approved lots; define capture process and use gallery fallback.

Auction app headless limits

High

Technical spike; retain hosted route or choose supported replacement.

Loan/account identity

High

Keep external Phase 1 portal; do not attempt SSO without vendor/API and security review.

Conflicting policies/contacts

High

Business/legal content workshop and single source of truth.

URL changes

High

Retain routes initially or test complete 301/canonical migration.

Third-party script creep

Medium-high

Script governance, consent category, performance budget, named owner.

Map/parcel accuracy

High

Use authoritative documents; label approximate overlays; record source/date.

Translations

Medium

Launch only complete human-reviewed locales with correct hreflang.

AI-generated implementation drift

Medium

Milestone prompts, architecture boundaries, tests, browser verification, and review before merge.

Recommended first action

Run a 90-minute architecture and content decision workshop. Approve the six decisions in Section 1.3, choose three representative properties (financed, cash/discount, and sold/auction), and provide one valid 360 panorama. Those fixtures should drive the first vertical slice before bulk migration.


# 14. Source References

Current-site observations

Online Land Sales home: Open reference

Arizona collection: Open reference

Example Texas property: Open reference

Buying process: Open reference

Fees: Open reference

FAQ: Open reference

Contact: Open reference

Customer protection commitment: Open reference

About: Open reference

Payment: Open reference


## Official implementation references

Next.js App Router documentation: Open reference

Next.js data fetching: Open reference

Next.js Route Handlers: Open reference

Shopify Storefront API: Open reference

Shopify headless Storefront API setup: Open reference

Shopify Cart API management: Open reference

Shopify Customer Account API: Open reference

Shopify metafields: Open reference

Shopify metaobjects: Open reference

GSAP for React: Open reference

Tailwind CSS with Next.js: Open reference

Photo Sphere Viewer: Open reference

Photo Sphere Viewer getting started: Open reference

Photo Sphere Viewer plugins: Open reference

Photo Sphere Viewer gyroscope: Open reference

Photo Sphere Viewer markers: Open reference

This PRD is a product and technical planning document, not legal, title, lending, tax, survey, or real-estate advice. All buyer-facing claims and policies require approval by the responsible business owner and qualified counsel.