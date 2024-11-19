import type { BaseComponentProps, ThemeTypes } from "../../Types/GeneralTypes.js";

export type DarkmodeAllTypes = ThemeTypes | 'system';

export interface DarkmodeProps extends BaseComponentProps {
    storage: string;
}
