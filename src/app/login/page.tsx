"use client";
import React from "react";
import LoginForm from "@/components/form";
import * as S from "./style";

const LoginPage: React.FC = () => {
  return (
    <S.LoginPage>
      <LoginForm />
    </S.LoginPage>
  );
};

export default LoginPage;
