import React from "react";

interface BrandMarkProps {
  className?: string;
  "aria-hidden"?: boolean;
}

export function BrandMark({
  className = "w-9 h-9 sm:w-10 sm:h-10",
  "aria-hidden": ariaHidden = true,
}: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <defs>
        <clipPath id="ols-brand-mark-clip">
          <rect width="512" height="512" rx="72" />
        </clipPath>
      </defs>
      <g clipPath="url(#ols-brand-mark-clip)">
        {/* Top Blue Half */}
        <rect width="512" height="512" fill="#5B8CBD" />
        {/* Bottom Slate Half */}
        <path d="M0 345H270L455 160H512V512H0V345Z" fill="#6B7278" />
        {/* White Diagonal Road */}
        <path d="M0 300H62L248 115H512V160H455L270 345H0V300Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
