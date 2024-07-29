import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useClient } from "../settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone,faMicrophoneSlash,faVideo,faVideoSlash,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Controls(props) {
  const client = useClient();
  const navigate = useNavigate();
  const { Audio,Video, setStart, setInCall} = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

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

  const leaveChannel = async () => {
    client.removeAllListeners();
    Audio.track.close();
    Video.track.close();
    await client.leave();
    setStart(false);
    setInCall(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'99%',justifyContent:'space-around',marginTop:"10px"}}>
      <div>
            <button onClick={()=>{mute("audio")}} style={{padding:'0.8rem',border:'none',borderRadius:'50%',cursor:'pointer'}}><FontAwesomeIcon icon={trackState.audio ? faMicrophone : faMicrophoneSlash} style={{height:'27px',width:'32px'}}/></button>
      </div>
      <div>
            <button onClick={()=>{mute("video")}} style={{padding:'0.8rem',border:'none',borderRadius:'50%',cursor:'pointer'}}><FontAwesomeIcon icon={trackState.video ? faVideo : faVideoSlash} style={{height:'1.5rem'}}/></button>
      </div>
      <div>
            <button onClick={()=>leaveChannel()} style={{padding:'0.8rem',border:'none',borderRadius:'50%',cursor:'pointer'}}><FontAwesomeIcon icon={faRightFromBracket} style={{height:'1.5rem'}}/></button>
      </div>
    </div>
  );
}