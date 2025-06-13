'use client';
import CircleLoading from "./CircleLoading.js";

export default function PageLoading() {
    return (
        <div
            id="page-load"
            className="page-load absolute d-flex f-center h-100 w-100 pb-5"
        >
            <CircleLoading size={40} />
        </div>
    )
}