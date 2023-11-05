import styles from './login.module.scss'
import React, {useEffect, useState} from "react";
import useTokenStore from "@/app/store/token";
import useUserStore from "@/app/store/user";

export default function MobileLoginView(){
    const { Login, setLoginFromOpen, setStatus, Join } = useUserStore()
    const { setAccessToken, setRefreshToken } = useTokenStore()
    const [loginType, setLoginType] = useState<string>('')
    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');

    const [joinName, setJoinName] = useState<string>('');
    const [joinId, setJoinId] = useState<string>('');
    const [joinPw, setJoinPw] = useState<string>('');

    const [idMessage, setIdMessage] = useState<string>('');
    const [isId, setIsId] = useState<boolean>(false);
    const [isPw, setIsPw] = useState<boolean>(false);

    const checkId = (id:string) => {
        setJoinId(id)
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!regExp.test(id)) {
            setIdMessage("이메일 형식으로 입력해 주세요.");
            setIsId(false);
        } else {
            setIdMessage("사용가능한 이메일 입니다.");
            setIsId(true);
        }
    }
    const checkPwSame = (pw:string) => {
        if(joinPw === pw){
            setIsPw(true)
        }else{
            setIsPw(false)
        }
    }

    const goJoin = () =>{
        const sucJoin = () =>{
            setLoginFromOpen(false);
            alert(`회원가입에 성공하였습니다. 로그인 해주세요.`)

        }
        Join(joinName,joinId,joinPw,sucJoin)
    }

    useEffect(() => {
        if(joinId.length===0){
            setIdMessage('')
        }
    }, [joinId]);

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
                        loginType==='join'?
                        <div className={styles.login_join_form}>
                            <h1>회원가입</h1>
                            <div className={styles.login_email}>
                                <ul>
                                    <li>
                                        <label>이름</label>
                                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setJoinName(e.target.value)}
                                               type={"text"} placeholder="이름"/>
                                    </li>
                                    <li>
                                        <label>이메일</label>
                                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>checkId(e.target.value)}
                                               type={"text"} placeholder="이메일"/>
                                        <h5 style={{color:(!isId && joinId.length>0)?"red":"black"}}>{idMessage}</h5>
                                    </li>
                                    <li>
                                        <label>비밀번호</label>
                                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setJoinPw(e.target.value)}
                                               type={"password"} placeholder="비밀번호"/>
                                    </li>
                                    <li>
                                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>checkPwSame(e.target.value)}
                                               type={"password"} placeholder="비밀번호 확인"/>
                                        <h5 style={{color:(!isPw && joinPw.length>0)?"red":"black"}}>{(!isPw && joinPw.length>0)&&'비밀번호가 일치하지 않습니다.'}</h5>
                                    </li>
                                </ul>
                            </div>
                            <button
                                className={`${ (isId&&isPw&&(joinName.length!==0)) ? styles.active: ''}`}
                                onClick={()=>goJoin()}
                                disabled={!(isId&&isPw&&(joinName.length!==0))}>
                                회원가입</button>
                        </div>
                            :
                        loginType==='email'?
                        <div className={styles.login_email_form}>
                            <h1>로그인</h1>
                            <div className={styles.login_email}>
                                <ul>
                                    <li>
                                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setId(e.target.value)} type={"text"} placeholder="이메일"/>
                                        <span>아이디 찾기</span>
                                    </li>
                                    <li>
                                        <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPw(e.target.value)} type={"password"} placeholder="비밀번호"/>
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
                            :
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
                    }
                </div>

                {
                    loginType!=='join'&&
                    <div className={styles.login_bottom_btn}>
                        <span>계정이 없으세요? <button onClick={()=>setLoginType('join')}>가입하기</button> </span>
                    </div>
                }
            </div>
        </div>
    )
}