import React, { useEffect, useRef, useState } from 'react';
import { Vocals } from '../../Utils/utils'
import AllVocals from '../AllVocals/AllVocals';
import Buttons from '../Buttons/Buttons';
import './Player.css'

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [looping,setLooping] = useState(false)
    const [currentTime,setCurrentTime] = useState(0)
    const [duration,setduration] = useState(0)
    const [colors,setColors] = useState([])

    const timeBar = useRef();
    const showBar = useRef();

    //function that toggles play or pause and stops or continues the playback
    const togglePause = () => {
        const prev = isPlaying;
        setIsPlaying(!prev);

        if(!prev) {
            //play the audio and continue with the playback
            Vocals.forEach(({audio}) => {
                audio.play();
                showBar.current = requestAnimationFrame(whilePlaying);
            });
        }
        else {
            //pause the audio and continue with the playback
            Vocals.forEach(({audio}) => {
                audio.pause();
                cancelAnimationFrame(showBar.current)
            })
        }
    }

    //function that stops the audio
    const stop = () => {
        //set state the player isnt playing
        setIsPlaying(false);
        //pause all channels and make their current time to 0 seconds
        Vocals.forEach(({audio}) => {
            audio.pause();
            audio.currentTime = 0;
        })
    };

    //toggle mute function
    const toggleMute = (vocalId) =>{
        vocalId.muted = !vocalId.muted;
    }

    //toggle loop function
    const toggleLoop = () => {
        const prev = looping;
        setLooping(!prev);
        Vocals.forEach(({audio}) => {
        audio.loop = !audio.loop;
        });
    };

    const vocalDuration = Vocals[0].audio.duration;


    useEffect(() => {
        //generate random color
        const getRandomColor = () => {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          };
          
          // generate array of colors for the background of the players
          //const colors = [];
          for (let i = 0; i < 8; i++) {
            colors.push(getRandomColor());
          }
    })

    useEffect(() => {
        //sets the duration for all channels and playback
        const seconds = Math.floor(vocalDuration);
        setduration(seconds);
        timeBar.current.max = seconds;    
    }, [
        Vocals[0].audio?.loadedmetadata,
        Vocals[0].audio?.readyState,
        vocalDuration,
    ]);

    useEffect(() => {
        //checks if the track reached its end and there is no loop
        if (currentTime==17 && Vocals[0].audio.loop == false) {
            setIsPlaying(false);
        }
    },[currentTime])

    //check the current time
    const whilePlaying = () => {
        timeBar.current.value = Vocals[0].audio.currentTime
        setCurrentTime(timeBar.current.value)
        showBar.current = requestAnimationFrame(whilePlaying);
    }

    //updates the current time soo the playback will move
    const changeTime = () => {
        Vocals.forEach(({audio}) => {
            audio.currentTime = timeBar.current.value;
        });
        setCurrentTime(timeBar.current.value)
    };


    return (
        <div className='player__container'>
            {/* the playback at realtime */}
            <input 
                className={ isPlaying? 'player__range' : 'player__range player__range__inactive'}
                onChange={changeTime}
                   type='range'
                   min = '0'
                   max = '17'
                   defaultValue = '0'
                   ref={timeBar}
            />
            
            {/* channels section */}
            <AllVocals vocals={Vocals} muteOn={toggleMute} colors={colors} />
            {/* buttons section */}
            <Buttons playPause={togglePause}
                    isPlaying = {isPlaying}
                    stop = {stop}
                    toggleLoop = {toggleLoop}
                    duration = {duration}
                    currentTime = {currentTime}
                    isLooping = {looping}
                    />
        </div>
    )
}

export default Player;