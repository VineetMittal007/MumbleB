import { useState,useEffect } from "react";
import { appId} from "../settings";
import './../css/Videocall.css';
import Videos from "./Videos";
import Controls from "./Controls";
import { useSelector } from "react-redux";

export default function Videocall(props){
    const {setInCall,client,audio,token,video,users,setUsers,start,setStart} = props;
    const [showChat,setShowChat] = useState(false);
    const usr = useSelector(state=>state.auth.curruser);

    useEffect(()=>{
        let init = async(name)=>{
            client.on("user-published",async(user,mediaType)=>{
                console.log("published",user,mediaType);
                await client.subscribe(user,mediaType);
                if(mediaType === "video"){
                    setUsers((prevUsers)=>{
                        if(prevUsers[prevUsers.length-1]==user) return prevUsers;
                        else    return [...prevUsers,user];
                    });
                }
                if(mediaType === "audio"){
                    user.audioTrack?.play();
                }
            });

            client.on('user-unpublished',(user,mediaType)=>{
                console.log("unpublished",user);
                if(mediaType === "audio"){
                    if(user.audioTrack)   user.audioTrack?.stop();
                }
                if(mediaType === "video"){
                    setUsers((prevUsers)=>{
                        return prevUsers.filter((User)=>User.uid !== user.uid);
                    })
                }
                console.log("User unpublished");
            })

            client.on('user-left',(user)=>{
                console.log("left",user);
                setUsers((prevUsers)=>{
                    return prevUsers.filter((User)=>User.uid !== user.uid);
                })
                console.log("User left");
            })
            
            try{
                await client.join(appId,name,token,null);
                if(audio.track && video.track)  await client.publish([audio.track,video.track]);
                setStart(true);
            }
            catch(err){
                console.log(err);
            }
        };

        if(audio.ready && video.ready && audio.track && video.track){
            try{
                init(window.location.pathname.substring(1));
            }
            catch(err){
                console.log(err);
            }
        }
    },[window.location.pathname.substring(1),client,audio.ready,video.ready,audio.track,video.track]);

    return(
        <div className="App">
            <div className="meeting-main-display" style={{display:"flex",flexDirection:"column"}}>
                {start && audio.track && video.track && <Videos users={users} audio={audio} video={video} />}
                {audio.ready && video.ready && audio.track && video.track && (
                    <Controls Audio={audio} Video={video} setStart={setStart} setInCall={setInCall} />
                )}
            </div>
            {showChat && <div></div>}
        </div>
    )
}