import React from "react";
import {usePathname} from "next/navigation";
import MobileTopNav from "@/app/layouts/mobile/header/MobileTopNav";
import MobileBottomNav from "@/app/layouts/mobile/bottom/MobileBottomNav";
import './mobile.scss'
import VideoView from "@/app/layouts/mobile/views/video/VideoView";
import usePageStore from "@/app/store/view";
import MobileMyProfile from "@/app/layouts/mobile/profile/MobileMyProfile";

export default function MobileMainView({children}: {children:React.ReactNode}){
    const { curView } = usePageStore()

    return(
        <>
            <MobileTopNav/>
            {(() => {
                switch (curView) {
                    case 'home':
                        return <VideoView/>;
                    case 'profile':
                        return <MobileMyProfile/>;
                    default:
                        return;
                }
            })()}
            <MobileBottomNav/>
        </>
    )
}