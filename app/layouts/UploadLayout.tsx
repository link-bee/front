import React from "react";
import {usePathname} from "next/navigation";
import TopNav from "@/app/layouts/includes/TopNav";

export default function UploadLayout({children}: {children:React.ReactNode}){
    return(
        <>
            <div className={"bg-white h-[100vh]"}>
                <TopNav/>
                <div className={"flex justify-between mx-auto w-full px-2 max-w-[1140px]"}>
                    {children}
                </div>
            </div>
        </>
    )
}