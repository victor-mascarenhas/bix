import { resumeFilter } from "@/models/transactions";
import { useTransactionStore } from "@/store";
import { filterTransactions } from "@/utils";
import { useEffect } from "react";

export const useTransaction = () => {
  const {
    transactions,
    filteredTransactions,
    filterProperties,
    loading,
    error,
    fetchData,
    fetchProperties,
    selectedFilters,
    clearStorage,
  } = useTransactionStore();

  useEffect(() => {
    if (transactions.length === 0) {
      fetchData({});
    }
    if (filterProperties.accounts.length === 0) {
      fetchProperties();
    }
  }, [fetchData, transactions, filterProperties, fetchProperties]);

  const resumedData = (filter: resumeFilter) => {
    const filtered = filterTransactions(transactions, filter);

    return filtered.reduce((acc, cur) => {
      return acc + parseInt(cur.amount);
    }, 0);
  };
  const pendingTransactionsAmount = () => {
    const today = new Date().getTime();
    const pending = transactions.filter((transac) => transac.date > today);
    return pending.reduce((acc, cur) => {
      return acc + parseInt(cur.amount);
    }, 0);
  };
  const balance = () => {
    return transactions.reduce((acc, cur) => {
      return acc + parseInt(cur.amount);
    }, 0);
  };

  return {
    transactions,
    filteredTransactions,
    loading,
    error,
    filterProperties,
    fetchData,
    resumedData,
    selectedFilters,
    clearStorage,
    pendingTransactionsAmount,
    balance,
  };
};
