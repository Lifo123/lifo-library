'use client';
import { useStore } from "@nanostores/react";
import { Darkmode, ThemeTypes } from "./Darkmode.Store.js";
import { $preferences } from "../../Stores/Preferences.Store.js";
import { SelectItem, SelectMenu } from "../Select/index.js";
import { Icon } from "public-icons";
import { Text } from "react-aria-components";


export default function DarkmodeDrop() {
  const PREFERENCES = useStore($preferences, { keys: ['theme'] });
  const handleSelect = (value: ThemeTypes) => {
    Darkmode.change(value);
  };

  return (
    <>
      <SelectMenu
        value={PREFERENCES.theme}
        customize={{
          trigger: { className: 'dm-select' }
        }}
        placement="bottom"
      >
        <SelectItem id='light' textValue="light" onPress={() => handleSelect('light')}>
          Light
        </SelectItem>

        <SelectItem id='dark' textValue="dark" onPress={() => handleSelect('dark')}>
          Dark
        </SelectItem>

        <SelectItem id='system' textValue="system" onPress={() => handleSelect('system')}>
          System
        </SelectItem>
      </SelectMenu>
    </>
  );
}
