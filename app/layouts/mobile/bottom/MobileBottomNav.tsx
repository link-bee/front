import Image from "next/image";
import usePageStore from "@/app/store/view";

export default function MobileBottomNav(){
    const { setView } =usePageStore()
    return(
        <>
            <div className="m_bottom_nav">
                <ul className="bottom_nav_btn_list">
                    {/*<li>*/}
                    {/*    <button>*/}
                    {/*        <i className="fa-solid fa-house"></i>*/}
                    {/*        홈*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    <li>
                        <button onClick={()=>setView('search')}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            검색
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>setView('home')}>
                            <i className="fa-solid fa-house"></i>
                            {/*<Image src="/favicon.png" alt="Main Logo" width="30" height="30"/>*/}
                            홈
                        </button>
                    </li>
                    {/*<li>*/}
                    {/*    <button>*/}
                    {/*        <i className="fa-regular fa-message"></i>*/}
                    {/*        알림*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    <li>
                        <button onClick={()=>setView('profile')}>
                            <i className="fa-regular fa-user"></i>
                            프로필
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}