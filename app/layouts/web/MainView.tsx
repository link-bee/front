import React from "react";
import {usePathname} from "next/navigation";
import TopNav from "@/app/layouts/web/header/TopNav";
import SideNav from "@/app/layouts/web/side/SideNav";
import './web.scss'

export default function MainView({children}: {children:React.ReactNode}){
    const pathname = usePathname();

    return(
        <>
            <TopNav/>
            <SideNav/>
            {children}
        </>
    )
}