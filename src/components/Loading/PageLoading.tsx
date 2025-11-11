'use client';
import { Icon } from "public-icons";

interface PageLoadingProps {
    children?: React.ReactNode;
}

export default function PageLoading({ children }: PageLoadingProps) {
    return (
        <div
            id="page-load"
            className="page-load absolute d-flex f-center h-screen w-screen pb-10"
        >
            {children || <span className="custom-spin"><Icon size={40} icon="loader-circle" strokeWidth={1.65} /></span>}
        </div>

    )
}