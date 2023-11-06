import {create} from "zustand";

type User = {
    loginForm:boolean,
    setLoginFromOpen:Function,
    status : boolean,
    setStatus:Function,
    Login : Function,
    LogOut : Function,
    Join : Function,
    info:UserInfo,
    setUserInfo:Function,
}

const emptyUser = {
    "sub": '',
    "auth": '',
    "linked": [],
    "myLink": [],
    "likes": [],
    "email": '',
    "id": 0,
    "username": '',
    "exp": 0
}

const useUserStore = create<User>((set)=>({
    loginForm:false,
    setLoginFromOpen:(loginForm:boolean)=>set({loginForm:loginForm}),
    status: false ,
    setStatus:(status:boolean)=>set({status:status}),
    Login : ((id:string,pw:string,callBack:Function)=>{
        fetch(`/login/basic/login?email=${id}&password=${pw}`,{method:"POST"})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                localStorage.setItem("refresh", json.refreshToken);
                localStorage.setItem("access", json.accessToken);
                return callBack(json);
            })
        }
    ),
    info:emptyUser,
    setUserInfo :(info:UserInfo)=>set({info:info}),
    LogOut : (()=>{
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        location.reload()
    }),
    Join:((name:string, id:string, pw:string,callBack:Function)=>{
        fetch(`/login/basic/join`,{method:"POST",
            body: JSON.stringify({
                "email": id,
                "password": pw,
                "name": name,
                "id":0
            }),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                console.log(json)
                // localStorage.setItem("jwt", json.accessToken);

                return callBack(json);
            })
        }
    )
}))

export default useUserStore