"use client";
import { useStore } from "@nanostores/react";
import { $darkmode, darkmode, ThemeTypes } from "./theme.store";
import { SelectItem, SelectMenu } from "@Components/index";

export default function DarkmodeDrop() {
  const THEME = useStore($darkmode);

  const handleSelect = (value: ThemeTypes) => {
    darkmode.change(value);
  };

  return (
    <>
      <SelectMenu
        value={THEME}
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
