"use client";

import React, { useEffect } from "react";

type AdBannerTypes = {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
};

const AdBannerMobile = ({
    dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive,
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
        <div className="my-3 w-full justify-center items-center hidden md:flex">
            <ins
                className="adsbygoogle"
                style={{ display: "inline-block", width: 350, height: 50 }}
                data-ad-client="ca-pub-2529229033686497"
                data-ad-slot={dataAdSlot}
                // data-ad-format={dataAdFormat}
                // data-full-width-responsive={dataFullWidthResponsive.toString()}
            ></ins>
        </div>

    );
};

export default AdBannerMobile;