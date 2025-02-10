export interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw" | string;
  currency: string;
  account: string;
  industry: string;
  state: string;
  [key: string]: string | number;
}

export type DateInterval = {
  startDate: number;
  endDate: number;
};

export type FilterTransactionType = {
  date?: DateInterval;
  account?: string;
  industry?: string;
  state?: string;
  transaction_type?: "deposit" | "withdraw";
  [key: string]: string | undefined | DateInterval;
};

export type selectedFilters = {
  startDate?: number;
  endDate?: number;
  account?: string;
  industry?: string;
  state?: string;
  [key: string]: string | undefined | number;
};

export type resumeFilter = {
  transaction_type?: "deposit" | "withdraw";
  date?: {
    startDate: number;
    endDate: number;
  };
  [key: string]: string | undefined | DateInterval;
};
