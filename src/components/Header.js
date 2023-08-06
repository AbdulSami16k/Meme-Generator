import React from "react";
export default function Header(){
    return(
        <header className="header">
        <img 
            src="./images/icon.png" 
            className="header--image"
        />
        <h2 className="header--title">Meme Generator</h2>
        <h4 className="header--project">Just 4 Fun!</h4>
    </header>
    )
}