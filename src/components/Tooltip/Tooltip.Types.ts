export interface TooltipProps {
    text?: string;
    custom?: React.ReactNode;
    children: React.ReactNode;
    margin?: string;
    dir?: 'btl' | 'btr' | 'ttb' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb' | string;
}