import React from "react";
import ReactQueryProvider from "./react-query";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
