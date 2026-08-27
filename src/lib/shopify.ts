import { CartItem } from "@/types/cart";

export interface ShopifyCheckoutResponse {
  checkoutUrl: string;
  checkoutId?: string;
  success: boolean;
}

/**
 * Creates a Shopify Cart / Checkout URL for the selected land parcel and financing reservation
 */
export async function createShopifyCheckout(
  items: CartItem[],
  customerEmail?: string
): Promise<ShopifyCheckoutResponse> {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // If live credentials exist, execute actual Shopify Storefront GraphQL query
  if (shopifyDomain && storefrontToken) {
    try {
      const lineItems = items.map((item) => ({
        merchandiseId: item.property.id,
        quantity: 1,
        attributes: [
          { key: "Property Code", value: item.property.propertyCode },
          { key: "Plan", value: item.selectedPlan.name },
          { key: "Total Price", value: `$${item.selectedPlan.totalFinancedPrice}` },
          { key: "Monthly Payment", value: `$${item.selectedPlan.monthlyPayment}/mo` },
          { key: "Term", value: `${item.selectedPlan.termMonths} Months` },
        ],
      }));

      const mutation = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const res = await fetch(`https://${shopifyDomain}/api/2024-07/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontToken,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: {
              lines: lineItems,
              buyerIdentity: customerEmail ? { email: customerEmail } : undefined,
            },
          },
        }),
      });

      const json = await res.json();
      if (json.data?.cartCreate?.cart?.checkoutUrl) {
        return {
          success: true,
          checkoutUrl: json.data.cartCreate.cart.checkoutUrl,
          checkoutId: json.data.cartCreate.cart.id,
        };
      }
    } catch (err) {
      console.warn("Shopify API call failed, falling back to mock checkout:", err);
    }
  }

  // Graceful fallback to sandbox/demo checkout confirmation URL
  const firstItem = items[0];
  const params = new URLSearchParams({
    property: firstItem?.property.propertyCode || "LAND-LOT",
    title: firstItem?.property.title || "Land Reservation",
    dueToday: (firstItem?.amountDueToday || 398).toString(),
    plan: firstItem?.selectedPlan.name || "Standard Financed",
    demo: "true",
  });

  return {
    success: true,
    checkoutUrl: `/cart/confirmation?${params.toString()}`,
    checkoutId: `cart_mock_${Date.now()}`,
  };
}
