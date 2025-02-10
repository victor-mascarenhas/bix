import { NextResponse } from "next/server";
import * as db from "./db.json";
import { FilterTransactionType } from "@/models/transactions";
import { filterTransactions } from "@/utils";

export const GET = (req: any, res: any) => {
  const url = new URL(req.url);
  const filters: FilterTransactionType = Object.fromEntries(
    url.searchParams.entries()
  );

  const payload: FilterTransactionType = {
    account: filters?.account,
    industry: filters?.industry,
    state: filters?.state,
  };

  if (filters.startDate && filters.endDate) {
    payload["date"] = {
      startDate: parseInt(filters.startDate),
      endDate: parseInt(filters.endDate),
    };
  }

  if (req.method === "GET") {
    try {
      const dbJSON = JSON.parse(JSON.stringify(db));
      return NextResponse.json(
        filterTransactions(dbJSON.transactions, payload),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return NextResponse.json(
        { error: "Erro ao buscar transações." },
        { status: 500 }
      );
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
