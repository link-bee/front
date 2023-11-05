import React from "react";
import useViewStore from "@/app/store/view";
import useUserStore from "@/app/store/user";

export default function SideNav(){
    const { setLoginFromOpen, status, LogOut } = useUserStore()
    const { setView } = useViewStore()


    const changeView = (view:string) => {
        if(status || view === 'home'){
            setView(view);
        }else{
            setLoginFromOpen(true)
        }
    }

    return(
        <div className="side_bar">
            <ul>
                <li>
                    <button onClick={()=>changeView('home')}>
                        <i className="fa-solid fa-house" ></i>
                        <span>홈</span>
                    </button>
                </li>
                <li>
                    <button onClick={()=>changeView('profile')}>
                        <i className="fa-regular fa-user"></i>
                        <span>프로필</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}