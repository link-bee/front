import styles from './login.module.scss'
import React, {useEffect, useState} from "react";
import useTokenStore from "@/app/store/token";
import useLoginStore from "@/app/store/login";
export default function Login(){
    const { Login, setLoginFromOpen, setStatus } = useLoginStore()
    const { setAccessToken, setRefreshToken } = useTokenStore()
    const [loginType, setLoginType] = useState<string>('')
    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');

    const setIdByInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setId(e.target.value)
    }
    const setPwByInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPw(e.target.value)
    }

    const checkLogin = (token:any) =>{
        setAccessToken(token.accessToken)
        setRefreshToken(token.refreshToken)
        setStatus(true);
        setLoginFromOpen(false);
    }

    useEffect(() => {
        if(loginType===''){
            setId('')
            setPw('')
        }
    }, [loginType]);

    return (
        <div className={styles.login_wrap}>
            <div className={styles.login_form}>
                <div className={styles.login_top_btn}>
                    <button>
                        {
                            loginType!==''&&<i onClick={()=>{setLoginType('')}} className="fa-solid fa-chevron-left"></i>
                        }
                    </button>
                    <button onClick={()=>setLoginFromOpen(false)}> <i className="fa-solid fa-xmark"></i> </button>
                </div>
                
                <div className={styles.login_main}>
                    {
                        loginType===''?
                        <div className={styles.login_type_select}>
                            <h1>Link에 로그인</h1>
                            <ul>
                                <li>
                                    <button onClick={()=>setLoginType('email')}>
                                        <span>Email로 진행</span>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={()=>setLoginType('google')}>
                                        <span>Google로 계속 진행</span>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={()=>setLoginType('naver')}>
                                        <span>Naver로 계속 진행</span>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={()=>setLoginType('kakao')}>
                                        <span>KakaoTalk으로 계속 진행</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                            :
                        <div className={styles.login_email_form}>
                            <h1>로그인</h1>
                            <div className={styles.login_email}>
                                <ul>
                                    <li>
                                        <input onChange={(e)=>setIdByInput(e)} type={"text"} placeholder="이메일"/>
                                        <span>아이디 찾기</span>
                                    </li>
                                    <li>
                                        <input onChange={(e)=>setPwByInput(e)} type={"password"} placeholder="비밀번호"/>
                                        <span>비밀번호 찾기</span>
                                    </li>
                                </ul>
                            </div>
                            <button
                                className={`${(id!=='' && pw!=='') ? styles.active: ''}`}
                                onClick={()=>Login(id,pw,checkLogin)}
                                disabled={(id=='' || pw=='')}>
                                로그인</button>
                        </div>
                    }
                </div>

                <div className={styles.login_bottom_btn}>
                    <span>계정이 없으세요? <button>가입하기</button> </span>
                </div>
            </div>
        </div>
    )
}