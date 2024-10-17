type DateFilters =
  | string
  | {
      start?: string;
      end?: string;
    };

export type OrderFilters = {
  status: string;
  createdAt: DateFilters;
  updatedAt: DateFilters;
  id: string;
  productID: string;
  email: string;
  billingAddress: string;
};
