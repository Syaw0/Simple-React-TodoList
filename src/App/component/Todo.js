import React,{useState} from "react";
import Button from "./Button";
import CheckBox from "./CheckBox"
import Edit_ico from "../icons/Edit_ico";
import Delete_ico from "../icons/Delete_ico"
import Other_ico from "../icons/Other_ico";

function Todo(props){
    const [isChecked , setIsChecked] = useState(false)


    const checked =(e)=>{
        setIsChecked((v)=>!v)
    }
    let classname = isChecked ? " todo-check":null
    return(
        <div className={"todo "+ classname } role="todo_con" >
            <div className="todo_text" role={"Todo_text_con"}>
                <h6>{props.text}</h6>
            </div>

            <div className="todo_btn">
                <CheckBox event = {checked} name={props.id}/>
                <Button  icon={<Edit_ico/>} role="editing" type="icon_btn" pclass="todo_btn_other_con_btn" event={props.event} name={"Edit "+props.id}/>
                <Button  icon={<Delete_ico/>} type="icon_btn" pclass="todo_btn_other_con_btn" event={props.event} name={"Delete "+props.id}/>
                
    
            </div>
        </div>
    )
}


export default Todo