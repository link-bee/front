import Image from "next/image";

export default function MobileBottomNav(){
    return(
        <>
            <div className="bottom_nav">
                <ul className="bottom_nav_btn_list">
                    <li>
                        <button>
                            <i className="fa-solid fa-house"></i>
                            홈
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            검색
                        </button>
                    </li>
                    <li>
                        <Image src="/favicon.png" alt="Main Logo" width="40" height="40"/>
                    </li>
                    <li>
                        <button>
                            <i className="fa-regular fa-message"></i>
                            알림
                        </button>
                    </li>
                    <li>
                        <button>
                            <i className="fa-regular fa-user"></i>
                            프로필
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}