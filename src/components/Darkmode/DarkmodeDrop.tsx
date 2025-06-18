import { useStore } from "@nanostores/react";
import { Darkmode } from "./Darkmode.Store.js";
import { $preferences } from "../../Stores/Preferences.Store.js";
import { ThemeTypes } from "../../Types/GeneralTypes.js";

export default function DarkmodeDrop() {
  const PREFERENCES = useStore($preferences);

  const handleSelect = (value: ThemeTypes) => {
    Darkmode.change(value);
  };

  return (
    <select
      className="lb-dm-dropdown" style={{userSelect: 'none'}}
      value={PREFERENCES.theme}
      onChange={(e) => handleSelect(e.target.value as ThemeTypes)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
