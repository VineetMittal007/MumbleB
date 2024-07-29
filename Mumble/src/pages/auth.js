import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch,useSelector } from "react-redux";
import '../css/Auth.css';
import  Axios from "axios";

export default function Auth(){
    const [image,setImage]=useState([]);
    const [newuser,setnewUser] = useState(false);
    const [forgotpass,setForgotPass] = useState(false);
    const [forgotcredentials,setForgotCredentials] = useState('');
    const [logindata,setLoginData] = useState({
        email:'',
        password:''
    });
    const [signupdata,setSignupData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    function handleclick(){
        setnewUser(!newuser);
    }

    function handleforgetPassword(){
        setForgotPass(true);
    }

    function handleCredentialsInput(e){
        setForgotCredentials(e.target.value)
    }

    function handleEmailInput(e){
        if(newuser){
            setSignupData({
                ...signupdata,
                email:e.target.value
            })
        }
        else{
            setLoginData({
                ...logindata,
                email:e.target.value
            })
        }
    }
    function handlePasswordInput(e){
        if(newuser){
            setSignupData({
                ...signupdata,
                password:e.target.value
            })
        }
        else{
            setLoginData({
                ...logindata,
                password:e.target.value
            })
        }
    }

    function handleNameInput(e){
        setSignupData({
            ...signupdata,
            name:e.target.value
        });
    }

    function handleconfirmPasswordInput(e){
        console.log('signup',e.target.value);
        setSignupData({
            ...signupdata,
            confirmPassword:e.target.value
        });
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendLoginData =()=>{
        try{
            Axios.post('https://mumble-backend.onrender.com/auth/login',{
                email:logindata.email,
                password:logindata.password
            },{
                withCredentials:true
            }).then((response)=>{
                dispatch(authActions.login());
                dispatch(authActions.setusr(response.data.user));
                navigate('/');
            })
            .catch(err=>console.log(err));
        }
        catch(err){
            console.log(err);
        }
    }

    const sendSignUpData = ()=>{
        try{
            Axios.post('https://mumble-backend.onrender.com/auth/signup',signupdata,{
                withCredentials:true
            }).then((response)=>{
                dispatch(authActions.login());
                dispatch(authActions.setusr(response.data.user));
                navigate('/');
            }).catch(err=>{
                console.log(err);
            });
        }
        catch(err){
            console.log(err);
        }
    }

    const sendResetLink = ()=>{
        try{
            Axios.post('https://mumble-backend.onrender.com/auth/forgotPassword',{
                email:forgotcredentials
            },{
                withCredentials:true
            }).then((response)=>{
                console.log(response);
            }).catch(err=>{
                console.log(err);
            })
        }
        catch(err){
            console.log(err);
        }
    }

    function handleImageChange(e){
        setImage([...e.target.files]);
    }

    function handleFormSubmit(e){
        e.preventDefault();
        if(!forgotpass){
            if(newuser){
                sendSignUpData();
            }
            else{
                sendLoginData();
            }
        }
        else{
            sendResetLink();
        }
        
    }

    return(
        <div className="auth-page-div">
            <div className="auth-form-div">

                {!forgotpass
                    &&
                <>
                    {newuser ? <h1 className="form-text">Sign Up</h1> : <h1 className="form-text">Log In</h1>}
                    <form onSubmit={handleFormSubmit}>
                        {newuser && 
                        <div className="email-div">
                            <h3 className="label">Name</h3>
                            <input type="text" placeholder="Name" name="name" value={signupdata.name} onChange={handleNameInput} required className="inp"/>
                        </div>}
                        <div className="email-div">
                            <h3 className="label">Email</h3>
                            <input type="email" placeholder="Email address" name="email" value={newuser ? signupdata.email : logindata.email} onChange={handleEmailInput} required className="inp"/>
                        </div>
                        <div className="email-div">
                            <h3 className="label">Password</h3>
                            <input type="password" placeholder="Password" name="password" value={newuser ? signupdata.password :logindata.password} onChange={handlePasswordInput} required className="inp"/>
                        </div>
                        {newuser && 
                        <div className="email-div">
                            <h3 className="label">Confirm Password</h3>
                            <input type="password" placeholder="Confirm Password" name="confirm password" value={signupdata.confirmPassword} onChange={handleconfirmPasswordInput} required className="inp"/>
                        </div>}
                        {newuser && <input type="file" onChange={handleImageChange} />}
                        {newuser ? <button type="submit" className="btn">Sign Up</button> : <button type="submit" className="btn">Log In</button>}
                        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                            {!newuser && <p onClick={handleclick} className="p-link">New user ? Sign up Here</p>}
                        {newuser && <p onClick={handleclick} className="p-link">Already a user ? Log in Here</p>}
                        {!newuser && <span onClick={handleforgetPassword} className="p-link">Forgot Password</span>}
                        </div>
                        
                    </form>
                </>
                }
                {forgotpass
                    &&
                    <form onSubmit={handleFormSubmit}>
                        <div className="email-div">
                            <h3 className="label">Email</h3>
                            <input type="email" placeholder="Email address" name="email" value={forgotcredentials} onChange={handleCredentialsInput} required className="inp"/>
                        </div>
                        <button type="submit" className="btn">Send Reset Link</button>
                    </form>
                }
                
            </div>
        </div>
    )
}