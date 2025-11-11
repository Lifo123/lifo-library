'use client';
import { useStore } from "@nanostores/react";
import { Darkmode } from "./Darkmode.Store.js";
import { $preferences } from "../../Stores/Preferences.Store.js";
import { ThemeTypes } from "../../Types/GeneralTypes.js";
import { SelectItem, SelectMenu } from "../Select/index.js";
import React from "react";

export default function DarkmodeDrop() {
  const PREFERENCES = useStore($preferences);
  const ref = React.useRef<HTMLElement | any>(null);

  const handleSelect = (value: ThemeTypes) => {
    Darkmode.change(value);
  };

  return (
    <>
      <SelectMenu
        value={PREFERENCES.theme}
        customize={{
          trigger: { className: 'btn-third rounded-sm f-row gap-2 items-center justify-between pointer py-1.5 px-3 fs-14 pr-2.5 fw-400' }
        }}
        ref={ref}
      >
        <SelectItem id='light' onPress={() => handleSelect('light')}>Light</SelectItem>
        <SelectItem id='dark' onPress={() => handleSelect('dark')}>Dark</SelectItem>
        <SelectItem id='system' onPress={() => handleSelect('system')}>System</SelectItem>
      </SelectMenu>
    </>
  );
}
