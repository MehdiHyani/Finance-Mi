import { create } from "zustand";

interface TransactionsState {
  transactionsListFilters: {
    categories: string[];
    amountRange: [number | null, number | null];
    search: string;
    dateRange: [string | null, string | null];
    paymentMethods: string[];
  };
  changeTransactionsListFilters: <
    K extends keyof TransactionsState["transactionsListFilters"]
  >(
    key: K,
    value: TransactionsState["transactionsListFilters"][K]
  ) => void;
}

export const useDashboardStore = create<TransactionsState>((set) => ({
  transactionsListFilters: {
    categories: [],
    amountRange: [null, null],
    search: "",
    dateRange: [null, null],
    paymentMethods: [],
  },
  changeTransactionsListFilters: (key, value) =>
    set((state) => ({
      transactionsListFilters: {
        ...state.transactionsListFilters,
        [key]: value,
      },
    })),
}));
