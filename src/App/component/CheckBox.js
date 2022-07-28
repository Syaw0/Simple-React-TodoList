import React from "react";


function CheckBox(props){

    return(
<>
<label className="container">   
  <input role={'checkbox'} type="checkbox" onChange={props.event} name ={"Checkbox " + props.name}/>
  <span className="checkmark"></span>
</label>
</>
    )
}


export default CheckBox

