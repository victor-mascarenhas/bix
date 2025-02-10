import { NextResponse } from "next/server";
import * as db from "../db.json";
import { Transaction } from "@/models/transactions";

export const GET = (req: any, res: any) => {
  if (req.method === "GET") {
    try {
      const dbJSON = JSON.parse(JSON.stringify(db));
      const accountSet = new Set();
      const industrySet = new Set();
      const stateSet = new Set();
      dbJSON.transactions.forEach((transaction: Transaction) => {
        accountSet.add(transaction.account);
        industrySet.add(transaction.industry);
        stateSet.add(transaction.state);
      });
      return NextResponse.json({
        accounts: Array.from(accountSet),
        industries: Array.from(industrySet),
        states: Array.from(stateSet),
      });
    } catch (error) {
      console.error("Erro ao buscar propriedades:", error);
      return NextResponse.json(
        { error: "Erro ao buscar propriedades." },
        { status: 500 }
      );
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
