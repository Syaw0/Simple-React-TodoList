import React from "react";



function Button(props){

    return(
        <button className={props.type +" "+" "+ props.pclass } onClick={props.event}  name={props.name}>{props.icon}{props.inner}</button>
    )
}


export default Button