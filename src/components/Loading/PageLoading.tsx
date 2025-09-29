'use client';
import Icons from "../Icons/Icons.js";

interface PageLoadingProps {
    children?: React.ReactNode;
}

export default function PageLoading({ children }: PageLoadingProps) {
    return (
        <div
            id="page-load"
            className="page-load absolute d-flex f-center h-screen w-screen pb-10"
        >
            {children || <Icons size={48} icon="loading" style={{strokeWidth: 1.35}} />}
        </div>
    )
}