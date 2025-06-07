import { useStore } from "@nanostores/react";
import type { DarkmodeAllTypes, DarkmodeProps } from "./Darkmode.types.js";
import { $theme, Darkmode } from "./Darkmode.Store.js";

export default function DarkmodeDrop(props: DarkmodeProps) {
  const theme = useStore($theme);

  const handleSelect = (value: DarkmodeAllTypes) => {
    Darkmode.change(props.storage || "F-Theme", value);
  };

  return (
    <select
      className="lb-dm-dropdown"
      value={theme}
      onChange={(e) => handleSelect(e.target.value as DarkmodeAllTypes)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
