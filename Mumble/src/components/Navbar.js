import React from "react";
import { useEffect,useState } from "react";
import Axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import '../css/Navbar.css'
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "../store/auth";

export default function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isloggedin = useSelector((state)=>state.auth.isLoggedIn);

    useEffect(()=>{
        try{
            Axios.get('https://mumble-backend.onrender.com/isloggedin',{ 
                withCredentials: true,
            }).then((response)=>{
                dispatch(authActions.login());
                dispatch(authActions.setusr(response.data.user));
            }).catch(err=>console.log(err));
        }
        catch(err){
            console.log(err);
        }
    },[]);
    
    const usr = useSelector(state=>state.auth.curruser);
    function handleLogOut(){

        try{
            Axios.get('https://mumble-backend.onrender.com/logout',{
                withCredentials:true
            }).then(response=>{
                dispatch(authActions.logout());
                dispatch(authActions.unsetusr());
                navigate('/');
            }).catch(err=>{
                console.log(err);
            })
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className="navbar">
            <div className="navbar-logo-div">
                <img src="/favicon.png" alt="logo" className="logo-img"/>
                <h2 className="navbar-logo-text" onClick={()=>navigate('/')}>mumble</h2>
            </div>
            <div className="navbar-logo-div">
                {!isloggedin && <Link to='/auth' className="link"><button className="login-btn" >Log In</button></Link>}
                {isloggedin && <button onClick={handleLogOut} className="logout-btn">Log Out</button>}
                {!isloggedin && <Link to='/auth' className="link"><button className="signup-btn" >Sign Up</button></Link>}
                {isloggedin && <Link to='/account' className="link"><button className="account-btn" id="acc-img" ><img crossOrigin="anonymous" src={`http://localhost:5000/public/${usr.photo}`} alt="user" id="my-img"/></button></Link>}
            </div>
        </div>
    )
}