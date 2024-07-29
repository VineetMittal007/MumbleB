import { useState,useEffect } from "react";
import { useClient,useMicrophoneAudioTrack,useCameraVideoTrack } from "../settings";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Axios from "axios";
import Videocall from "../components/Videocall";
import Prejoin from "../components/PreJoin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Meeting(){
    const [inCall,setInCall] = useState(false);
    const [users,setUsers] = useState([]);
    const [start,setStart] = useState(false);
    const [token,setToken] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const client = useClient();
    const audio = useMicrophoneAudioTrack();
    const video = useCameraVideoTrack();
    useEffect(()=>{
        try{
            Axios.get('https://mumble-backend.onrender.com/isloggedin',{ 
                withCredentials: true,
            }).then((response)=>{
                dispatch(authActions.login());
                dispatch(authActions.setusr(response.data.user));
            }).catch((err)=>navigate('/auth'));
        }
        catch(err){
            navigate('/auth');
        }
        try{
            Axios.get(`https://mumble-backend.onrender.com/token/generatetoken?channelname=${window.location.pathname.substring(1)}`,{
                withCredentials: true,
            })
                .then((res)=>setToken(res.data.token))
                .catch(err=>console.log(err));
        }
        catch(err){
            console.log(err);
        }
    },[window.location.pathname.substring(1)]);

    return (
        <div style={{height:"100vh"}}>
            {inCall ? <Videocall setInCall={setInCall} client={client} audio={audio} token={token} video={video} users={users} setUsers={setUsers} start={start} setStart={setStart} /> : <><Navbar/><div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}><Prejoin token={token} inCall={inCall} setInCall={setInCall} client={client} audio={audio} users={users} setUsers={setUsers} video={video} setStart={setStart} /></div><Footer/></>}
        </div>
    )
}