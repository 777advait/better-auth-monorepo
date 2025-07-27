import React from "react";
import ClientSession from "~/components/client-session";
import { api } from "~/lib/api/server";
import { getQueryClient, HydrateClient } from "~/lib/query-client";

export default async function SessionPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await api.auth.me.$get();

      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json();
    },
  });

  return (
    <HydrateClient>
      <ClientSession />
    </HydrateClient>
  );
}
