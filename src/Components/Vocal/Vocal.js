import React,{useState} from 'react';

function Vocal({ muteOn, vocal}) {
    const [mute, setIsMute] = useState(false);

    //function to toggle mute for each channel
    const toggleMute = () => {
        setIsMute(() => !mute);
        muteOn(vocal.audio);
    };

    return(
        <div>
            <div className='back'> 
                {/* mute button */}
                <button onClick={toggleMute}>mute</button>
                {/* channel name */}
                {vocal.name}
                <audio src={vocal.audio} loop></audio>
            </div>
        </div>
    )
}

export default Vocal;

