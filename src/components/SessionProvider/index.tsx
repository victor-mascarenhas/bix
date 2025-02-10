"use client";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

export function SessionProvider(props) {
  return (
    <NextAuthProvider session={props.session}>
      {props.children}
    </NextAuthProvider>
  );
}
