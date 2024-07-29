import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector,useDispatch } from "react-redux";

export default function Home(){
    const [text,setText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(state=>state.auth.isLoggedIn)
    function handleInput(e){
        setText(()=>{
            return e.target.value;
        })
    }

    const handleCreateMeeting = ()=>{
        if(login){
            const choices = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let newid='';
                for(let i=0;i<11;i++){
                    if(i==3 || i==7)    newid=newid+'-';
                    else    newid=newid+choices[Math.floor(Math.random()*(choices.length-1))];
                }
                console.log(newid);
                        try{
                            Axios.post(`https://mumble-backend.onrender.com/meeting`,{
                                meetingId:newid
                            },{
                                withCredentials:true
                            }).then(response=>{
                                navigate(`/${newid}`);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                        catch(err){
                            console.log(err);
                        }
            
        }
        else    navigate('/auth');
    }

    const handleJoin = ()=>{
        if(login){
            try{
                Axios.get(`https://mumble-backend.onrender.com/meeting/${text}`,{
                    withCredentials:true
                }).then(response=>{
                    navigate(`/${text}`);
                }).catch(err=>{
                    console.log(err);
                })
            }
            catch(err){
                console.log(err);
            }
        }
        else navigate('/auth');
    }

    return(
        <main id="homepage">
            <Navbar/>
            <div className='main-div'>
                <div id='div1'>
                    <h1 className='h1-main-content'>
                        Fast, reliable,
                    </h1>
                    <h1 className='h1-main-content'>
                        and secure +
                    </h1>
                    <h1 className='h1-main-content'>
                        conferencing
                    </h1>
                    <p className='h1-sub-content'>
                    Hold incredible events, share knowledge, build
                    </p>
                    <p className='h1-sub-content'>
                    and grow your community, create opportunity
                    </p>
                    <div className='meeting-info-div'>
                        <h1 className='h1-meeting-title'>Ready to start a meeting ?</h1>
                        <div className='meeting-info-details-div'>
                            <button className='new-meeting-btn' onClick={handleCreateMeeting}><FontAwesomeIcon icon={faVideo} />&nbsp;&nbsp;Create Meeting</button>
                            <input type="text" placeholder='Enter code' value={text} onInput={handleInput} className='meeting-id' />
                            {text && <button className='join-meeting-div' onClick={handleJoin}>Join Meeting</button>}
                        </div>
                    </div>
                </div>
                <div id='img-div'>
                    <img src='assets/pic.png' alt='image' style={{"width":"100%","height":"100%"}}/>
                </div>
            </div>

            <Footer/>
        </main>
    )
}