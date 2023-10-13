import { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

function AudioPlayer({ audioFile, image }) {

    
  const [duration, setDuration] = useState(0);
  console.log(duration)
  const [currentTime,setCurrentTime]=useState(0)
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);

  const audioRef = useRef();

  function handleDuration(e) {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime=e.target.value;
  }

  function handleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume=e.target.value
  }

  function tooglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }
  function toogleMute() {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  }

  function handleTimeUpdate(){
    setCurrentTime(audioRef.current.currentTime*10)
  }

  function handleLoadedMetaData(){
    setDuration(audioRef.current.duration)
  }

  function handleEnded(){
    setCurrentTime(0)
    setIsPlaying(false)
  }
  

  const formatTime=(time)=>{
     const min=Math.floor(time/60)
     const seconds=Math.floor(time%60)
     return (`${min}:${seconds<10?"0":""}${seconds}`)
  }


  useEffect(()=>{
      if(isPlaying){
        audioRef.current.play() 
      }
      else{
        audioRef.current.pause()
      }
  },[isPlaying,audioFile])


  useEffect(()=>{
    if(isMute){
      audioRef.current.volume=0
      setVolume(0)
    }
    else{
      audioRef.current.volume=1
      setVolume(1)
    }
},[isMute])

useEffect(()=>{
    const audio=audioRef.current
    console.log(audio)
    audio.addEventListener("timeupdate",handleTimeUpdate)
    audio.addEventListener("loadedmetadata",handleLoadedMetaData)
    audio.addEventListener("ended",handleEnded)

    return()=>{
        audio.removeEventListener("timeupdate",handleTimeUpdate)
        audio.removeEventListener("loadedmetadata",handleLoadedMetaData)
        audio.removeEventListener("ended",handleEnded)
    }

},[])

  return (
    <div className="custom-audio-player">
      <img src={image} className="display-image-input" />
      <audio ref={audioRef} src={audioFile} />
      <div className="duration-flex">
        <p onClick={tooglePlay}> {isPlaying ? <FaPause /> : <FaPlay />}</p>

        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          onChange={handleDuration}
          className="duration-range"
          step={0.01}
        />
        <p>-{formatTime(duration-currentTime)}</p>

        <p onClick={toogleMute}> {isMute ? <FaVolumeMute /> : <FaVolumeUp/>}</p>

        <input
        value={volume}
          max={1}
          min={0}
          step={0.01}
          type="range"
          onChange={handleVolume}
          className="volume-range"
        />
      </div>
   
    </div>
  );
}

export default AudioPlayer;
