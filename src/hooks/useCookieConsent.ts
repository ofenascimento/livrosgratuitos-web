"use client";
import { useEffect, useState } from "react";

export type ConsentStatus = "accepted" | "declined" | null | undefined;

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentStatus>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem("cookiesAccepted") as "accepted" | "declined" | null;
    setConsent(stored ?? null);
  }, []);

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "accepted");
    setConsent("accepted");

    (window as any).gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      personalization_storage: "granted",
    });

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {}
  };

  return { consent, accept };
};