import { useStore } from "@nanostores/react";
import type { DarkmodeAllTypes, DarkmodeProps } from "./Darkmode.types.js";
import { $theme, Darkmode } from "./Darkmode.Store.js";
import SelectOptions from "../Select/SelectOptions.js";

export default function Test(props: DarkmodeProps) {
    const theme = useStore($theme);

    const handleSelect = (value: DarkmodeAllTypes) => {
        Darkmode.change(props.storage || 'F-Theme', value);
    }

    return (
        <>
            <SelectOptions text={theme}
                className="br-6 lb-dm-dropdown"
                options={['light', 'dark', 'system']}
                onChange={handleSelect}
            />
        </>
    );
}
