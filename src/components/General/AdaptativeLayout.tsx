"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { $clientStore } from "../../stores/clientStore";

type Props = {
  children: (props: {
    isMobile: boolean;
    isMounted: boolean;
    isTouchDevice: boolean;
  }) => React.ReactNode;
};

export function AdaptiveLayout({ children }: Props) {
  const { isMobile, isTouchDevice } = useStore($clientStore, {
    keys: ["isMobile", "isTouchDevice"],
  });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return <>{children({ isMobile, isMounted: mounted, isTouchDevice })}</>;
}
