import React, { useState } from "react";
import LampOn from "../images/lamp_on.png";
import LampOff from "../images/lamp_off.png";
import "../styles/lamp.css";
import { get_authorization } from "../scripts/auth-scripts";

function Lamp({setOnDisplay}){

    const [on, setOn] = useState(false);

    return (
        <div className="lamp-div">
            <img src={on ? LampOn : LampOff} className="lamp-img" width={on ? 500 : 650}/>
            <button className="lamp-button" onClick={
                ()=>get_authorization(
                    ()=>setOn(!on),
                    ()=>setOnDisplay(true)
                )
            }>Turn {on ? "off" : "on"} the lamp</button>
        </div>
    );
}

export default Lamp;