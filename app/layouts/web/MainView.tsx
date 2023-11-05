import React from "react";
import TopNav from "@/app/layouts/web/header/TopNav";
import SideNav from "@/app/layouts/web/side/SideNav";
import './web.scss'
import useViewStore from "@/app/store/view";
import UploadView from "@/app/layouts/web/views/upload/UploadView";
import useUserStore from "@/app/store/user";
import LoginView from "@/app/layouts/web/views/login/LoginView";
import ProfileView from "@/app/layouts/web/views/profile/ProfileView";
import VideoView from "@/app/layouts/web/views/video/VideoView";

export default function MainView(){
    const { curView } = useViewStore();
    const {loginForm} = useUserStore()
    return(
        <>
            <TopNav/>
            <SideNav/>
            {(() => {
                switch (curView) {
                    case 'home':
                        return <VideoView/>;
                    case 'upload':
                        return <UploadView/>;
                    case 'profile':
                        return <ProfileView/>;
                    default:
                        return;
                }
            })()}
            {
                loginForm&&<LoginView/>
            }
        </>
    )
}