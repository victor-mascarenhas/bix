"use client";
import CardComponent from "@/components/Card";
import * as S from "./style";
import { useSession } from "next-auth/react";
import { useTransaction } from "@/hooks/useTransactions";
import FilterComponent from "@/components/Filter";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/SideBar";

const DashboardPage = () => {
  const { resumedData, pendingTransactionsAmount, balance, transactions } =
    useTransaction();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <S.Main>
        <FilterComponent />
        <S.CardContainer>
          <CardComponent
            title={"Receitas"}
            amount={resumedData({ transaction_type: "deposit" })}
          />
          <CardComponent
            title={"Despesas"}
            amount={resumedData({ transaction_type: "withdraw" })}
          />
          <CardComponent
            title={"Pendentes"}
            amount={pendingTransactionsAmount()}
          />
          <CardComponent title={"Saldo Total"} amount={balance()} />
        </S.CardContainer>
        <S.ChartContainer>
          <BarChart transactions={transactions} />
          <LineChart transactions={transactions} />
        </S.ChartContainer>
      </S.Main>
    </div>
  );
};

export default DashboardPage;
