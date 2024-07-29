import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState:{isLoggedIn:false,curruser:{photo:'user.png'}},
    reducers:{
        login(state){
            state.isLoggedIn =true;
        },
        logout(state){
            state.isLoggedIn =false;
        },
        setusr(state,action){
            state.curruser = action.payload;
        },
        unsetusr(state){
            state.curruser = {photo:'user.png'}
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;