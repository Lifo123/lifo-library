"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { _clientStore, ClientStore } from "../../stores/clientStore";

type Props = {
  children: (props: ClientStore & { isMounted: boolean }) => React.ReactNode;
};

export function AdaptiveLayout({ children }: Props) {
  const client = useStore(_clientStore);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return <>{children({ ...client, isMounted: mounted })}</>;
}
