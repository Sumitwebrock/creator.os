"use client";

import type React from "react";

export type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  loadingLabel: string;
};

export function LoadingButton({
  isLoading,
  loadingLabel,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  const finalDisabled = disabled ?? isLoading;

  return (
    <button
      {...props}
      disabled={finalDisabled}
      aria-disabled={finalDisabled}
    >
      {isLoading ? (
        <>
          <span className="creatoros-spinner" aria-hidden="true" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
