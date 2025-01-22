import AdBanner from '@/components/ADS/AdBanner'
import React from 'react'

const Sidebar = () => {
    return (
        <div className="hidden lg:block w-full lg:w-[30%] mt-6 md:mt-0 md:ml-6 p-4">
            <div className="sticky top-10">
                <div className=" flex flex-col justify-center items-center gap-2">
                    <AdBanner dataAdSlot="1056153721" square />
                    <AdBanner dataAdSlot="3065602915" square />
                </div>
            </div>
        </div>
    )
}

export default Sidebar