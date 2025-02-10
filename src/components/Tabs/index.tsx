import React from "react";
import { Tag } from "antd";

type TabProps = {
  name: string | number;
};

const dateHandler = (input: number | string) => {
  if (typeof input === "number") {
    return new Date(input).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  }
  return input;
};

const Tab = ({ name }: TabProps) => (
  <Tag.CheckableTag checked>{dateHandler(name)}</Tag.CheckableTag>
);

export default Tab;
