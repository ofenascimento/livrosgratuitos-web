"use client";

import React, { useEffect } from "react";

type AdBannerTypes = {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
    fixed?: boolean; // Nova prop
};

const AdBanner = ({
    dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive,
    fixed,
}: AdBannerTypes) => {
    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
                {}
            );
        } catch (error: any) {
            console.log(error.message);
        }
    }, []);

    return (
        <div
            className={`my-3 w-full justify-center items-center hidden md:flex ${
                fixed ? "fixed bottom-0 left-0 z-50 my-0" : ""
            }`}
            style={fixed ? { backgroundColor: "#fff" } : {}}
        >
            <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: 728, height: 90 }}
                data-ad-client="ca-pub-2529229033686497"
                data-ad-slot={dataAdSlot}
                // data-ad-format={dataAdFormat}
                // data-full-width-responsive={dataFullWidthResponsive?.toString()}
            ></ins>
        </div>
    );
};

export default AdBanner;
