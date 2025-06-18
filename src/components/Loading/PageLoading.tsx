'use client';
import CircleLoading from "./CircleLoading.js";

interface PageLoadingProps {
    children?: React.ReactNode;
}

export default function PageLoading({ children }: PageLoadingProps) {
    return (
        <div
            id="page-load"
            className="page-load absolute d-flex f-center h-100 w-100 pb-10"
        >
            {children || <CircleLoading size={40} />}
        </div>
    )
}