import React, {useEffect, useState} from "react";
import MobileTopNav from "@/app/layouts/mobile/header/MobileTopNav";
import MobileBottomNav from "@/app/layouts/mobile/bottom/MobileBottomNav";
import './mobile.scss'
import MobileVideoView from "@/app/layouts/mobile/views/video/MobileVideoView";
import MobileMyProfile from "@/app/layouts/mobile/profile/MobileMyProfile";
import MobileUpload from "@/app/layouts/mobile/upload/MobileUpload";
import useViewStore from "@/app/store/view";
import MobileLoginView from "@/app/layouts/mobile/views/login/MobileLoginView";
import useUserStore from "@/app/store/user";
import useEditStore from "@/app/store/edit";

export default function MobileMainView(){
    const { loginForm } = useUserStore()
    const { curView } = useViewStore()
    const { setEditInfo, setEditFlag} = useEditStore()
    const [beforeView, setBeforeView] = useState<string>('')
    
    useEffect(() => {
        if(beforeView){
            if (beforeView === 'profile' || curView === 'edit'){
                setEditFlag(false);
                setEditInfo({});
            }
        }
        setBeforeView(curView);
    }, [curView]);
    
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