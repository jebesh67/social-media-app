"use client";

import dynamic from "next/dynamic";

export const ClientGridLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.GridLoader),
  {ssr: false},
);
