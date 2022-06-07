import React,{useTransition , useState , memo , useCallback , useEffect} from "react";
import Button from "./component/Button"
import Todo from "./component/Todo"

window.onload = ()=>{
    document.getElementById("root").style.width = window.innerWidth + "px"
    document.getElementById("root").style.height = window.innerHeight + "px"
}

window.addEventListener("resize" , ()=>{
    console.log(window.innerHeight)
    document.getElementById("root").style.width = window.innerWidth + "px"
    document.getElementById("root").style.height = window.innerHeight + "px"
})



const MemoTodo = memo(Todo,areE)

function areE(p,m){
    if(p["id"] == m["id"] && p["text"] == m["text"]){
        return true
    }
    return false
}

function App(){
    const [todos , setTodos ] = useState(["Frist Todo :) Enjoy..."])
    const [inputValue , setInputValue ] = useState("")
    const [editing , setEditing] = useState({value:null , status:false})

    const hanldeInput = (e)=>{
        setInputValue(e.target.value)
    }

    const handleButton = ()=>{
        if (inputValue.trim() != ""){
            let value = inputValue
            setInputValue("")
            setTodos((v)=>[value,...v])
        }
    }

    const handleOtherBtn = (e) =>{
        let item = e.currentTarget.name.split(" ")[1]
        let name = e.currentTarget.name.split(" ")[0]
        switch (name) {
            case "Edit":
                setEditing({status:true , value:todos[item] , item:item})
                break;

            case "Delete":
                let value = todos
                value.splice(item,1)
                setTodos([...value])
               break;
        
        }

        
    }

    const edit=()=>{
        let value = todos;
        value[editing["item"]] = editing["value"]
        setTodos(value)
        setEditing((v)=>{return{...v,status:false}})

    }

    return(
        <div id="todo_app_con">
            <h5 id="todo_header">TODO APP</h5>

            <div id="todo_input_con">
                <input type={"text"} className="input"  id="todo_input" placeholder="Write Your Todos Here ..." value={inputValue} onChange={hanldeInput} onKeyDown={(e)=>{e.key=="Enter" ? handleButton() : null}} />
                <Button inner="Add Todo" type="primary" event={handleButton}/>
            </div>


                <div id="todos_holder">
                {todos.map((v,i)=>{
                    return <MemoTodo text={v} key={i} id={i} event={handleOtherBtn} />
                })}
                </div>


                {editing["status"] &&   <div id="editing">
                    <input type={"text"} id="todo_input" role={"editing_input"} className="input" value={editing["value"]} onChange={(e)=>{setEditing((v)=>{return{...v,value:e.target.value}})}}/>
                    <span className="editing_btn">
                    <Button inner="Edit" type="text" role={"editing_btn"}  event={()=>{edit()}} />
                    <Button inner="Cancel" type="text" role={"cancel_editing"} event={(e)=>{setEditing((v)=>{return{...v,status:false}})}}/>
                    </span>
                </div>}

        </div>
    )
}



export default App