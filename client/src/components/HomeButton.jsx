import React from 'react';
import { useNavigate } from 'react-router-dom'; //navigate instead of history = useHistory in newer versions of react-router-dom

const HomeButton = () => {
    let navigate = useNavigate();

    const sendHome = (e) => {
        //e.preventDefault();
        navigate("/"); 
    }

    const myStyle = { //Format copied from: https://www.w3schools.com/react/showreact.asp?filename=demo2_react_css_inline_object
        position: "absolute",
        top: "1rem",
        left: "1rem", //stick it close to the top right
    };

    return <div style={myStyle}>

        <button className="btn btn-warning" onClick={sendHome}>Home</button>

    </div>;
};

export default HomeButton;
