import React from "react";
import TopNav from "@/app/layouts/web/header/TopNav";
import SideNav from "@/app/layouts/web/side/SideNav";
import './web.scss'
import VideoList from "@/app/layouts/web/views/video/VideoList";
import useViewStore from "@/app/store/view";
import UploadView from "@/app/layouts/web/views/upload/UploadView";
import Login from "@/app/layouts/web/login/Login";
import useLoginStore from "@/app/store/login";

export default function MainView(){
    const { curView } = useViewStore();
    const {loginForm} = useLoginStore()
    return(
        <>
            <TopNav/>
            <SideNav/>
            {(() => {
                switch (curView) {
                    case 'home':
                        return <VideoList/>;
                    case 'upload':
                        return <UploadView/>;
                    case 'profile':
                    default:
                        return;
                }
            })()}
            {
                loginForm&&<Login/>
            }
        </>
    )
}