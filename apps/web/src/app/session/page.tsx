"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { api } from "~/lib/api/client";

export default function ClientSession() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await api.user.me.$get();

      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No session data</div>;

  return (
    <div>
      <p>{JSON.stringify(data, null, 12)}</p>
    </div>
  );
}
