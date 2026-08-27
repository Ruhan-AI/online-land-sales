export interface FAQItem {
  question: string;
  answer: string;
  category: "Financing & Payments" | "Buying Process" | "Guarantees & Title" | "Visiting & Using Land";
}

export const FAQS: FAQItem[] = [
  {
    category: "Financing & Payments",
    question: "Do you really offer guaranteed financing with no credit checks?",
    answer: "Yes, 100%! Because we own every parcel of land free and clear, we don't rely on third-party banks or credit bureaus. As long as you can make the initial down payment and one-time document fee, your financing is 100% guaranteed.",
  },
  {
    category: "Financing & Payments",
    question: "Can I pay off my property early, and is there a penalty?",
    answer: "There are never any prepayment penalties! In fact, we encourage early payoffs and offer discounts if you decide to pay off your balance early.",
  },
  {
    category: "Buying Process",
    question: "What happens after I make the down payment online?",
    answer: "Once you complete checkout, our closing team generates your official Land Installment Contract and Promissory Note within 24 hours. We email these documents via secure digital signature (DocuSign/SignNow). Once signed, you receive immediate full access to your property.",
  },
  {
    category: "Guarantees & Title",
    question: "What is your 90-Day 100% Satisfaction Guarantee?",
    answer: "We want you to love your land. If for any reason you visit your property or decide it's not the right fit within 90 days of purchase, you can exchange 100% of your principal payments toward any other parcel in our active inventory, or request a full refund.",
  },
  {
    category: "Guarantees & Title",
    question: "How and when do I receive the official Deed to the property?",
    answer: "For cash purchases, we prepare and record your Special Warranty Deed or Warranty Deed directly with the County Recorder's Office within 14 business days. For seller-financed purchases, we record the official Deed in your name as soon as your final loan payment is received.",
  },
  {
    category: "Visiting & Using Land",
    question: "Can I visit the land in person before buying?",
    answer: "Yes! Every listing includes exact GPS coordinates, boundary maps, and driving directions. You are welcome to visit, walk the property lines, and inspect the terrain at your convenience.",
  },
  {
    category: "Visiting & Using Land",
    question: "Can I camp or use my RV on the land while making monthly payments?",
    answer: "Yes, you have immediate recreational and usage rights as soon as your contract is signed, subject to standard county zoning guidelines for camping and permits.",
  },
];
