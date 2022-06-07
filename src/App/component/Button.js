import React from "react";



function Button(props){

    return(
        <button className={props.type +" "+" "+ props.pclass } role={props.role} onClick={props.event}  name={props.name}>{props.icon}{props.inner}</button>
    )
}


export default Button