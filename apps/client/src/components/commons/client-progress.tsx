"use client";

import { Next13ProgressBar } from "next13-progressbar";
import React from "react";

export default function ClientProgress({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="5px"
        color="#FFFFFF"
        options={{ showSpinner: true }}
        showOnShallow
      />
    </>
  );
}
