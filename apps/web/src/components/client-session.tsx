"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { useTRPC } from "~/trpc/client";

export default function ClientSession() {
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(trpc.auth.me.queryOptions());

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No session data</div>;

  return (
    <div>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
}
