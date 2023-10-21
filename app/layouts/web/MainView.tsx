import React from "react";
import {usePathname} from "next/navigation";
import MobileTopNav from "@/app/layouts/mobile/header/MobileTopNav";
import MobileBottomNav from "@/app/layouts/mobile/bottom/MobileBottomNav";
import MobileSideNav from "@/app/layouts/mobile/side/MobileSideNav";

export default function MainView({children}: {children:React.ReactNode}){
    const pathname = usePathname();

    return(
        <>
            <MobileTopNav/>
            {children}
            <MobileBottomNav/>
        </>
    )
}