"use client";
import { LoaderCircle } from "lucide-react";

interface PageLoadingProps {
  children?: React.ReactNode;
}

export function PageLoading({ children }: PageLoadingProps) {
  return (
    <div id="page-load" className="page-load">
      {children || (
        <span>
          <LoaderCircle size={40} strokeWidth={1.8} />
        </span>
      )}
    </div>
  );
}
