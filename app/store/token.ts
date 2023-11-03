import {create} from "zustand";

type Token = {
    accessToken:string,
    refreshToken:string,
    setAccessToken : Function,
    setRefreshToken : Function
}
const useTokenStore = create<Token>((set)=>({
    accessToken:'',
    refreshToken:'',
    setAccessToken : (accessToken:string)=> set({accessToken: accessToken}),
    setRefreshToken : (refreshToken:string)=> set({refreshToken: refreshToken}),
}))

export default useTokenStore