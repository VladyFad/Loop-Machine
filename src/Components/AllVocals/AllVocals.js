import React  from "react";
import Vocal from "../Vocal/Vocal";
import {Vocals} from '../../Utils/utils'
import './AllVocals.css'

function AllVocals({ vocals, muteOn, colors}) {
    return(
        <div className="vocals__container">
        <ul>
            {/* make a list of all the channels with different background color */}
            {Vocals.map((vocalObj,index) => (
                <li  style={{backgroundColor: colors[index]}}  key={index} >
                    <Vocal muteOn={muteOn} vocal={vocalObj}/>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default AllVocals;

