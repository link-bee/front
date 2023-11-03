"use client"

import MobileMainView from "@/app/layouts/mobile/MobileMainView";
import {useEffect, useState} from "react";
import MainView from "@/app/layouts/web/MainView";
import './globals.scss'

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(() => {
        setIsMobile( /Mobi|Android/i.test(navigator.userAgent))
        let vh = window.innerHeight * 0.01;

        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);


    return (
        <>
            <script src="https://kit.fontawesome.com/dc0f295e44.js" crossOrigin="anonymous"></script>
            {
              (isMobile!==undefined)?
                  isMobile?
                      <MobileMainView/>
                      :
                      <MainView/>
                      :
                  <></>
            }
      </>
  )
}
