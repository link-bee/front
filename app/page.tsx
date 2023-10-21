"use client"

import MobileMainView from "@/app/layouts/mobile/MobileMainView";
import MobileTopNav from "@/app/layouts/mobile/header/MobileTopNav";
import MobileBottomNav from "@/app/layouts/mobile/bottom/MobileBottomNav";
import {useEffect, useState} from "react";

export default function Home() {
    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(() => {
        console.log(isMobile)
        setIsMobile( /Mobi|Android/i.test(navigator.userAgent))
    }, []);

    return (
        <>
            <script src="https://kit.fontawesome.com/dc0f295e44.js" crossOrigin="anonymous"></script>
            {
              isMobile?
                  <>
                      <MobileMainView>
                      </MobileMainView>
                  </>
                  :
                  <div>

                  </div>
          }
      </>
  )
}
