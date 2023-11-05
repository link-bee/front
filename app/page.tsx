"use client"

import MobileMainView from "@/app/layouts/mobile/MobileMainView";
import {useEffect, useState} from "react";
import MainView from "@/app/layouts/web/MainView";
import './globals.scss'
import {JwtPayload ,jwtDecode} from "jwt-decode";
import {number} from "prop-types";
import useUserStore from "@/app/store/user";
import useTokenStore from "@/app/store/token";

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>();
    const { setStatus } =useUserStore()
    const { setAccessToken, setRefreshToken } = useTokenStore()

    useEffect(() => {
        setIsMobile( /Mobi|Android/i.test(navigator.userAgent))
        let vh = window.innerHeight * 0.01;

        if (localStorage.jwt) {
            const payload : JwtPayload = jwtDecode(localStorage.jwt)
            const date = new Date(0);
            date.setUTCSeconds(payload.exp ? payload.exp : 0);
            if(date > new Date()){
                setStatus(true)
            }else{
                setStatus(false)
                setAccessToken('')
                setRefreshToken('')
            }
        }

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
