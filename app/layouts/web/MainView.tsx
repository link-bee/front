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

export default function MainView({children}:{children:React.ReactNode}){
    const { curView } = useViewStore();
    const {loginForm} = useUserStore()
    return(
        <div className="cover_wrap">
            <div className="cover_info">
                <h1 style={{fontSize:'100px'}}>Link</h1>
                <br/>
                <br/>
                <br/>
                <h2>해당 서비스는 현재 모바일용으로 제작되었습니다.</h2>
                <h2>우측의 모바일 뷰 혹은 모바일 디바이스로 접속하여 이용 바랍니다.</h2>
            </div>
            <div className="phone"  style={{backgroundImage:("url(background.webp)")}}>
                <div  className="cover">
                    {children}
                </div>
            </div>
        </div>
    )
}