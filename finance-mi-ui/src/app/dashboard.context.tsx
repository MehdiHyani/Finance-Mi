import { create } from "zustand";

interface DashboardState {
  transactionsChart: {
    period: "15days" | "30days" | "60days";
    categories: string[];
    amountRange: [number | null, number | null];
    search: string;
    dateRange: [string | null, string | null];
    paymentMethods: string[];
  };
  changeTransactionsChart: <
    K extends keyof DashboardState["transactionsChart"]
  >(
    key: K,
    value: DashboardState["transactionsChart"][K]
  ) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  transactionsChart: {
    period: "15days",
    categories: [],
    amountRange: [null, null],
    search: "",
    dateRange: [null, null],
    paymentMethods: [],
  },
  changeTransactionsChart: (key, value) =>
    set((state) => ({
      transactionsChart: {
        ...state.transactionsChart,
        [key]: value,
      },
    })),
}));
