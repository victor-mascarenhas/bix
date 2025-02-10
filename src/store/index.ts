import { selectedFilters, Transaction } from "@/models/transactions";
import buildTransactionService from "@/services/transactionService";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type TransactionState = {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  selectedFilters: selectedFilters;
  filterProperties: {
    accounts: string[];
    industries: string[];
    states: string[];
  };
  loading: boolean;
  error: string | null;
  fetchData: (args: selectedFilters) => Promise<void>;
  fetchProperties: () => Promise<void>;
  clearStorage: () => void;
};

type PersistType = (
  config: StateCreator<TransactionState>,
  options: PersistOptions<TransactionState>
) => StateCreator<TransactionState>;

export const useTransactionStore = create<TransactionState>(
  (persist as PersistType)(
    (set) => ({
      transactions: [],
      selectedFilters: {},
      filteredTransactions: [],
      filterProperties: {
        accounts: [],
        industries: [],
        states: [],
      },
      loading: false,
      error: null,
      fetchData: async (filters: selectedFilters) => {
        const { getTransactions } = buildTransactionService();
        set({ loading: true, error: null });
        if (Object.keys(filters).length >= 1) {
          set({ selectedFilters: filters });
        }

        try {
          const response = await getTransactions(filters);
          set({ transactions: response, loading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Erro desconhecido",
            loading: false,
          });
        }
      },
      fetchProperties: async () => {
        const { getProperties } = buildTransactionService();
        set({ loading: true, error: null });

        try {
          const response = await getProperties();
          set({ filterProperties: response, loading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Erro desconhecido",
            loading: false,
          });
        }
      },
      clearStorage: () => {
        localStorage.removeItem("dash-storage");
        set({ selectedFilters: {} });
      },
    }),
    {
      name: "dash-storage",
      partialize: (state) => ({
        selectedFilters: state.selectedFilters,
      }),
    }
  )
);
