import { FinancingPlan, LandProperty } from "./land";

export interface CartItem {
  property: LandProperty;
  selectedPlan: FinancingPlan;
  purchaseType: "financed" | "cash";
  amountDueToday: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  termsAccepted: boolean;
  guaranteeAcknowledged: boolean;
}
