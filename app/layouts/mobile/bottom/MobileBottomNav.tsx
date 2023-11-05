import styles from "./MobileBottomNav.module.scss"
import useViewStore from "@/app/store/view";
import useUserStore from "@/app/store/user";

export default function MobileBottomNav(){
    const {setLoginFromOpen,status} = useUserStore()
    const { setView } = useViewStore()


    const changeView = (view:string) => {
        if(status || view === 'home'){
            setView(view);
        }else{
            setLoginFromOpen(true)
        }
    }

    return(
        <>
            <div className={styles.m_bottom_nav}>
                <ul className={styles.bottom_nav_btn_list}>
                    <li>
                        <button onClick={()=>changeView('home')}>
                            <i className="fa-solid fa-house"></i>
                            홈
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>changeView('upload')} className={styles.plus}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=>changeView('profile')}>
                            <i className="fa-regular fa-user"></i>
                            프로필
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}