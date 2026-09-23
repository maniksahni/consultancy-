"use client";

import { useEffect } from "react";
import { captureUTMParams } from "@/lib/utm";

export default function UTMTracker() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return null;
}
