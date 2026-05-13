"use client";
import { useStore } from "@nanostores/react";
import { $darkmode, darkmode, ThemeTypes } from "./theme.store";
import { SelectItem, SelectMenu } from "@Components/index";
import React from "react";

type Props = {
  theme?: ThemeTypes | string;
  setTheme?: (theme: ThemeTypes) => void;
};

export default function DarkmodeDrop({ theme, setTheme }: Props) {
  const [isMounted, setIsMounted] = React.useState(false);

  const THEME = useStore($darkmode);

  const handleSelect = (value: ThemeTypes) => {
    if (theme && setTheme) {
      setTheme?.(value);
    } else {
      darkmode.change(value);
    }
  };

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <SelectMenu
        value={isMounted ? theme || THEME : "system"}
        customize={{
          trigger: { className: "dm-select" },
        }}
        placement="bottom"
      >
        <SelectItem
          id="light"
          textValue="light"
          onPress={() => handleSelect("light")}
        >
          Light
        </SelectItem>

        <SelectItem
          id="dark"
          textValue="dark"
          onPress={() => handleSelect("dark")}
        >
          Dark
        </SelectItem>

        <SelectItem
          id="system"
          textValue="system"
          onPress={() => handleSelect("system")}
        >
          System
        </SelectItem>
      </SelectMenu>
    </>
  );
}
