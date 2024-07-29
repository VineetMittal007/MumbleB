import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './../css/videos.css'

export default function Video(props) {
  let { users, audio,video } = props;
  console.log('users',users);
  console.log('audioTrack',audio);
  console.log('videoTrack',video);
  const usr = useSelector(state=>state.auth.curruser);
  const [dimensions,setDimensions] = useState({
    height:window.innerHeight,
    width:window.innerWidth
  })

  useEffect(()=>{
    window.addEventListener('resize',()=>{
      setDimensions({height:window.innerHeight,width:window.innerWidth});
    });
    return ()=>{
      window.removeEventListener('resize',()=>{
        setDimensions({height:window.innerHeight,width:window.innerWidth});
      })
    }
  });

  useEffect(() => {
    console.log(users.length);
    if(video.track) video.track.play(document.getElementById('localVideoPlayer'));
    users.forEach(user=>{
      if(user.videoTrack) user.videoTrack.play(document.getElementById(`${user.uid}`));
    })
  }, [users, audio.track,video.track]);

  return (
      <>
        {dimensions.width<800 ? <div id="videos" style={{display:"flex",flexDirection:"row",flexWrap:"wrap",height:"87vh",justifyContent:"center",alignItems:"center"}}>
        {video.track && <div id="localVideoPlayer" className='vid' style={{width:'98%',height:'50%'}}/>}
        {!video.track && <div id="localNoVideoPlayer" className='vid' style={{width:'98%',height:'50%'}} ></div>}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <div id={user.uid} className='vid' style={{width:'98%',height:'50%'}} key={user.uid} />
              );
            }
          })}
      </div> : <div id="videos" style={{display:"flex",flexDirection:"row",flexWrap:"wrap",height:"87vh",justifyContent:"center",alignItems:"center"}}>
        {video.track && <div id="localVideoPlayer" className='vid' style={{width:'48%',height:'75%',minWidth:'400px'}}/>}
        {!video.track && <div id="localNoVideoPlayer" className='vid' style={{width:'48%',height:'75%',minWidth:'400px'}} ></div>}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <div id={user.uid} className='vid' style={{width:'48%',height:'75%',minWidth:'400px'}} key={user.uid} />
              );
            }
          })}
      </div>}
      </>      
  );
}