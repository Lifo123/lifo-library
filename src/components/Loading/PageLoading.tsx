"use client";
import { Icon } from "public-icons";

interface PageLoadingProps {
  children?: React.ReactNode;
}

export function PageLoading({ children }: PageLoadingProps) {
  return (
    <div id="page-load" className="page-load">
      {children || (
        <span>
          <Icon size={40} icon="loader-circle" strokeWidth={1.8} />
        </span>
      )}
    </div>
  );
}
