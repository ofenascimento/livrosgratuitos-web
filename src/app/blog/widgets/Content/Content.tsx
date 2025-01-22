import React from 'react'
import { IContent } from './types'
import Sidebar from '../Sidebar/Sidebar'
import AdBanner from '@/components/ADS/AdBanner'
import AdBannerMobile from '@/components/ADS/AdsBannerMobile'

const Content: React.FC<IContent> = ({ children }) => {
    return (
        <div className="flex w-full flex-wrap lg:flex-nowrap font-lexend font-extralight">
            <div className="w-full lg:w-[70%]">
                <AdBanner
                    dataAdFormat=""
                    dataFullWidthResponsive={false}
                    dataAdSlot="3946512730"
                    customClassName="mt-2"
                />
                <AdBannerMobile dataAdSlot="6603126932" customClassName="mt-2" />
                {children}
            </div>
            <Sidebar />
        </div>
    )
}

export default Content