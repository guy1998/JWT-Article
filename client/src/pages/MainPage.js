import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import PopUp from "../components/PopUp.js";
import Ribbon from "../components/Ribbon.js";
import Lamp from "../components/Lamp.js";

function MainPage() {

  const [onDisplay, setOnDisplay] = useState(false);

  return (
    <>
        <Ribbon />
        <Lamp setOnDisplay={setOnDisplay}/>
        <PopUp show={onDisplay} onHide={()=>setOnDisplay(false)} heading="Kot">
            <LoginForm setOnDisplay={setOnDisplay}/>
        </PopUp>
    </>
  );
}

export default MainPage;
