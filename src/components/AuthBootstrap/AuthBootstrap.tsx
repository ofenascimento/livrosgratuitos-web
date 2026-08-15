"use client";
import { useEffect } from "react";
import { setupFetchInterceptor } from "@/lib/setupFetchInterceptor";

export default function AuthBootstrap() {
  useEffect(() => {
    setupFetchInterceptor();
  }, []);

  return null;
}