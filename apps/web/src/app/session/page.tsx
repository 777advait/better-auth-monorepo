import React from "react";
import ClientSession from "~/components/client-session";
import { getQueryClient, HydrateClient, prefetch, trpc } from "~/trpc/server";

export default async function SessionPage() {
  // const queryClient = getQueryClient();
  await prefetch(trpc.auth.me.queryOptions());

  return (
    <HydrateClient>
      <ClientSession />
    </HydrateClient>
  );
}
