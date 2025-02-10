import React from "react";
import { Card } from "antd";
import { formatNumber } from "@/utils";

type CardProps = {
  title: string;
  amount: number;
};

const CardComponent = ({ title, amount }: CardProps) => (
  <Card title={title} bordered={false} style={{ width: 300 }}>
    <p>{formatNumber(amount)}</p>
  </Card>
);

export default CardComponent;
