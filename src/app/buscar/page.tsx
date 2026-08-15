"use client";
import AdBanner from "@/components/ADS/AdBanner";
import AdBannerMobile from "@/components/ADS/AdsBannerMobile";
import BookCatalog from "@/components/BookCatalog/BookCatalog";
import CustomLayout from "@/components/CustomLayout/CustomLayout";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function BuscarPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("s") || "";
  const router = useRouter();

  useEffect(() => {
    if (search === "undefined") {
      router.push("/");
    }
  }, [search]);

  return (
    <CustomLayout>
      <div className=" min-h-screen">
        <Navbar />
        <AdBanner
          dataAdFormat=""
          dataFullWidthResponsive={false}
          dataAdSlot="2423907456"
          customClassName="mt-4"
        />
        <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-3" />
        <BookCatalog title={search} />
        <br />
        <Footer />
      </div>
    </CustomLayout>
  );
}

export default BuscarPage;
