import React from "react";
import useViewStore from "@/app/store/view";

export default function SideNav(){
    const { setView } = useViewStore()
    return(
        <div className="side_bar">
            <ul>
                <li>
                    <button onClick={()=>setView('home')}>
                        <i className="fa-solid fa-house" ></i>
                        <span>홈</span>
                    </button>
                </li>
                <li>
                    <button onClick={()=>setView('profile')}>
                        <i className="fa-regular fa-user"></i>
                        <span>프로필</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}