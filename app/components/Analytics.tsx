"use client";

import { useEffect, useState } from "react";

export default function Analytics() {
  const [isOptedOut, setIsOptedOut] = useState(false);

  useEffect(() => {
    // Check localStorage for opt-out preference
    const optOut = localStorage.getItem("ga-opt-out") === "true";
    setIsOptedOut(optOut);

    // Set the data attribute only after client-side hydration
    document.documentElement.setAttribute("data-google-analytics-opt-out", optOut ? "true" : "");
  }, []);

  return null;
}