import {useEffect} from "react";
import Prejoincontrols from "./Prejoincontrols";

export default function Prejoin(props){
    const {setInCall,token,inCall,client,audio,video,users,setStart,setUsers} = props;

    useEffect(()=>{
        if(video.track) video.track.play(document.getElementById('prejoin-video-div'));
    },[client,audio,video]);

    return(
        <div className="prejoin-div" style={{display:'flex',flexDirection:'column',width:'90%',marginTop:'1rem',alignItems:'center',justifyContent:'center'}}>
            <div id="prejoin-video-div" style={{width:`100%`,height:`500px`,border:'none',backgroundColor:'white',borderRadius:'15px'}}/>
            <div style={{marginTop:'1rem',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:'25%'}}>
                <Prejoincontrols token={token} inCall={inCall} users={users} setUsers={setUsers} Audio={audio} Video={video} setStart={setStart} setInCall={setInCall} client={client} />
            </div>
        </div>
    )
}