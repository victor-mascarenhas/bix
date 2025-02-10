import { FilterTransactionType, Transaction } from "@/models/transactions";

export const filterTransactions = (
  transactions: Transaction[],
  filters: FilterTransactionType
) => {
  return transactions.filter((transaction) => {
    return Object.keys(filters).every((key) => {
      if (filters[key] === undefined || filters[key] === null) {
        return true;
      }

      if (key === "date") {
        const { startDate, endDate } = filters[key];

        const isAfterStartDate = startDate
          ? transaction[key] >= startDate
          : true;

        const isBeforeEndDate = endDate ? transaction[key] <= endDate : true;

        return isAfterStartDate && isBeforeEndDate;
      }

      return transaction[key] === filters[key];
    });
  });
};

export const formatNumber = (inputNumber: number) => {
  const toString = inputNumber.toString();
  const toInteger = toString.slice(0, -2) || "0";
  const toDecimal = toString.slice(-2);
  const formatedInteger = toInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${formatedInteger},${toDecimal}`;
};
