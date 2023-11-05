import React from "react";
import MobileTopNav from "@/app/layouts/mobile/header/MobileTopNav";
import MobileBottomNav from "@/app/layouts/mobile/bottom/MobileBottomNav";
import './mobile.scss'
import MobileVideoView from "@/app/layouts/mobile/views/video/MobileVideoView";
import MobileMyProfile from "@/app/layouts/mobile/profile/MobileMyProfile";
import MobileUpload from "@/app/layouts/mobile/upload/MobileUpload";
import useViewStore from "@/app/store/view";
import MobileLoginView from "@/app/layouts/mobile/views/login/MobileLoginView";
import useUserStore from "@/app/store/user";

export default function MobileMainView(){
    const { loginForm } = useUserStore()
    const { curView } = useViewStore()

    return(
        <>
            {(() => {
                switch (curView) {
                    case 'home':
                        return (
                            <>
                                <MobileTopNav/>
                                    <MobileVideoView/>
                                <MobileBottomNav/>
                            </>
                        );
                    case 'upload':
                        return <MobileUpload/>;
                    case 'profile':
                        return <MobileMyProfile/>;
                    default:
                        return;
                }
            })()}
            {
                loginForm&&<MobileLoginView/>
            }
        </>
    )
}