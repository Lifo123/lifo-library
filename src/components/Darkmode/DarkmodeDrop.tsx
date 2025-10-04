import { useStore } from "@nanostores/react";
import { Darkmode } from "./Darkmode.Store.js";
import { $preferences } from "../../Stores/Preferences.Store.js";
import { ThemeTypes } from "../../Types/GeneralTypes.js";
import Select from "../Select/Select.js";
import SelectOption from "../Select/SelectOption.js";

export default function DarkmodeDrop() {
  const PREFERENCES = useStore($preferences);

  const handleSelect = (value: ThemeTypes) => {
    Darkmode.change(value);
  };

  return (
    <>
      <Select
        value={PREFERENCES.theme!.charAt(0).toUpperCase() + PREFERENCES.theme!.slice(1)}
        onChange={(value) => handleSelect(value as ThemeTypes)}
        dir="btl"
      >
        <ul className="f-col w-full fs-2 py-1.5 px-1.5 fw-400 text-lifo-text">
          <SelectOption text="Light" value="light"  />
          <SelectOption text="Dark" value="dark" />
          <SelectOption text="System" value="system" />
        </ul>
      </Select>
      {/* <select
        className="lb-dm-dropdown" style={{ userSelect: 'none' }}
        value={PREFERENCES.theme}
        onChange={(e) => handleSelect(e.target.value as ThemeTypes)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select> */}
    </>
  );
}
