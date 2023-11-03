import {create} from "zustand";

type Login = {
    loginForm:boolean,
    setLoginFromOpen:Function,
    status : boolean,
    setStatus:Function,
    Login : Function,
    LogOut : Function,
}
const useLoginStore = create<Login>((set)=>({
    loginForm:false,
    setLoginFromOpen:(loginForm:boolean)=>set({loginForm:loginForm}),
    status: false ,
    setStatus:(status:boolean)=>set({status:status}),
    Login : ((id:string,pw:string,callBack:Function)=>{
        fetch(`/login/basic/login?email=${id}&password=${pw}`,{method:"POST"})
            .then((response) => response.json())//읽어온 데이터를 json으로 변환
            .then((json) => {
                localStorage.setItem("jwt", json.accessToken);

                return callBack(json);
            })
        }
    ),
    LogOut : (()=>{
        localStorage.removeItem('jwt');
        location.reload()
    })
}))

export default useLoginStore