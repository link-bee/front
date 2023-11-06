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
    const { setStatus,setUserInfo } =useUserStore()
    const { setAccessToken, setRefreshToken } = useTokenStore()

    useEffect(() => {
        setIsMobile( /Mobi|Android/i.test(navigator.userAgent))
        let vh = window.innerHeight * 0.01;

        if (localStorage.access) {
            const payload : JwtPayload = jwtDecode(localStorage.access)
            const date = new Date(0);
            date.setUTCSeconds(payload.exp ? payload.exp : 0);

            if(date > new Date()){
                setStatus(true);
                setAccessToken(localStorage.access)
                setRefreshToken(localStorage.refresh)
                setUserInfo(jwtDecode(localStorage.access))
            }else{
                fetch('/login/reissue',{method:"POST",
                    body: JSON.stringify({
                        "accessToken": localStorage.access,
                        "refreshToken": localStorage.refresh,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }})
                    .then((response) => response.json())//읽어온 데이터를 json으로 변환
                    .then((json) => {
                        console.log(json)

                        if(json.code==='401') {
                            localStorage.removeItem('access');
                            localStorage.removeItem('refresh');
                        }
                    })
            }
        }

        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);


    return (
        <>
            <script src="https://kit.fontawesome.com/dc0f295e44.js" crossOrigin="anonymous"></script>
            {
              (isMobile!==undefined)?
                  !isMobile?
                      <MainView>
                          <MobileMainView/>
                      </MainView>
                  :
                      <MobileMainView/>
                  :
                  <></>
            }
      </>
  )
}
