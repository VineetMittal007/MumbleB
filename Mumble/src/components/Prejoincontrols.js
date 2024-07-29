import { useState,useEffect } from "react";
import { appId} from "../settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone,faMicrophoneSlash,faVideo,faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Prejoincontrols(props) {
  const { inCall,token,users,client,setUsers,Audio,Video, setStart, setInCall} = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const usr = useSelector(state=>state.auth.curruser);

  const mute = async (type) => {
    if (type == "audio") {
      await Audio.track.setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type == "video") {
      await Video.track.setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

//   useEffect(()=>{
//     let init = async(name)=>{
//         client.on("user-published",async(user,mediaType)=>{
//             console.log("published",user,mediaType);
//             await client.subscribe(user,mediaType);
//             if(mediaType === "video"){
//                 setUsers((prevUsers)=>{
//                   user = {...user,usr};
//                     return [...prevUsers,user];
//                 });
//             }
//             if(mediaType === "audio"){
//                 user.audioTrack?.play();
//             }
//         });

//         client.on('user-unpublished',(user,mediaType)=>{
//             console.log("unpublished",user);
//             if(mediaType === "audio"){
//                 if(user.audioTrack)   user.audioTrack?.stop();
//             }
//             if(mediaType === "video"){
//                 setUsers((prevUsers)=>{
//                     return prevUsers.filter((User)=>User.uid !== user.uid);
//                 })
//             }
//             console.log("User unpublished");
//         })

//         client.on('user-left',(user)=>{
//             console.log("left",user);
//             setUsers((prevUsers)=>{
//                 return prevUsers.filter((User)=>User.uid !== user.uid);
//             })
//             console.log("User left");
//         })
        
//         try{
//             await client.join(appId,name,token,null);
//             if(Audio.track && Video.track)  await client.publish([Audio.track,Video.track]);
//             setStart(true);
//         }
//         catch(err){
//             console.log(err);
//         }
//     };

//     if(Audio.ready && Video.ready && Audio.track && Video.track){
//         try{
//             init(window.location.pathname.substring(1));
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// },[window.location.pathname.substring(1),client,Audio.ready,Video.ready,Audio.track,Video.track]);

  return (
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-around'}}>
      <div>
            <button onClick={()=>{mute("audio")}} style={{padding:'0.8rem',border:'none',borderRadius:'50%',cursor:'pointer'}}><FontAwesomeIcon icon={trackState.audio ? faMicrophone : faMicrophoneSlash} style={{height:'27px',width:'32px'}}/></button>
      </div>
      <div>
            <button onClick={()=>{mute("video")}} style={{padding:'0.8rem',border:'none',borderRadius:'50%',cursor:'pointer'}}><FontAwesomeIcon icon={trackState.video ? faVideo : faVideoSlash} style={{height:'1.7rem'}}/></button>
      </div>
      <div>
            <button onClick={()=>setInCall(true)} style={{padding:'0.3rem 1.1rem',border:'none',borderRadius:'5px',fontSize:'1.5rem',cursor:'pointer',fontFamily:'Quicksand'}}>Join</button>
      </div>
    </div>
  );
}