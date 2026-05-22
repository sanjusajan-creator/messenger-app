import {create} from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: {name:"sanju", _id:1234, age:25},
    isLoggedIn:false,
    login: ()=>{
        set({isLoggedIn: true})
        console.log(`We just logged in!`);
        
    }
}))