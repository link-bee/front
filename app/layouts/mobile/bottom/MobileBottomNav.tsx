import styles from "./MobileBottomNav.module.scss"
import useViewStore from "@/app/store/view";

export default function MobileBottomNav(){
    const { setView } = useViewStore()
    return(
        <>
            <div className={styles.m_bottom_nav}>
                <ul className={styles.bottom_nav_btn_list}>
                    <li>
                        <button onClick={()=>setView('home')}>
                            <i className="fa-solid fa-house"></i>
                            홈
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>setView('upload')} className={styles.plus}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </li>
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