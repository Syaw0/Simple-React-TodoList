import React from "react";
import { cleanup,render , screen , queryAllByAttribute, getByTestId, fireEvent } from "@testing-library/react";
import App from "../App/App";
import '@testing-library/jest-dom'


afterEach(cleanup)


describe("render phase" , ()=>{
    test("render app correctly" , ()=>{
        render(<App/>)
        
        const el2 = document.getElementById("todos_holder")
        expect(el2).toBeInTheDocument()
    })
})


describe('inputs', () => {
    test("input must be empty " , ()=>{
        const con  = render(<App/>)
        const ele =con.getByPlaceholderText("Write Your Todos Here ...")
        expect(ele.value).toBe("")

    })
})

describe('add todos', () => {
    test("fill the input with word" , ()=>{
        const con  = render(<App/>)
        const ele = con.getByPlaceholderText("Write Your Todos Here ...")
        fireEvent.change(ele , {
            target:{value:"hello"}
        })
        expect(ele.value).toBe("hello")
        const btn  = con.getByText(/Add todo/i)
        const countChildren = document.getElementById("todos_holder")
        expect(countChildren.childElementCount).toBe(1)
        fireEvent.click(btn)
        expect(countChildren.childElementCount).toBe(2)
    })
})

describe('delete', () => {
    test("add todo and than deleted )" , ()=>{
        const con  = render(<App/>)
                const countChildren = document.getElementById("todos_holder")
        const deletBtn = con.getAllByRole(/todo_con/i)[0].lastChild.lastChild
        fireEvent.click(deletBtn)
        expect(countChildren.childElementCount).toBe(0)

    })
})


describe('Edit Button', () => {
    test("its render correctly" , ()=>{
        const con  = render(<App/>)
        const editBtn  = con.getByRole(/editing/i)
        expect(editBtn).toBeInTheDocument()

    })
    test("when click on it its show up a edit container" , ()=>{
        const con = render(<App/>)
        const editBtn  = con.getByRole(/editing/i)
        fireEvent.click(editBtn)
        const editCon = document.getElementById("editing")
        expect(editCon).toBeInTheDocument()
        
    })
    test("value of the new input equal last input " , ()=>{
        const con = render(<App/>)
        const lastInput = con.getAllByRole("Todo_text_con")[0].firstChild.innerHTML
        const editBtn  = con.getByRole(/editing/i)
        fireEvent.click(editBtn)
        const newInput = con.getByRole(/editing_input/).value
        
        expect(lastInput).toEqual(newInput)
        // console.log(newInput)
    })
    test("when cancel a editing nothing change in ui and editing Con will unmouted" ,()=>{
        const con = render(<App/>)
        const lastInput = con.getAllByRole("Todo_text_con")[0].firstChild.innerHTML
        const editBtn  = con.getByRole(/editing/i)
        fireEvent.click(editBtn)
        const newInput = con.getByRole(/editing_input/)
        fireEvent.change(newInput , {target:{value:"Hello there"}})
        const cancel_edit = con.getByRole(/cancel_editing/)
        fireEvent.click(cancel_edit)
        const editCon = document.getElementById("editing")
        expect(editCon).not.toBeInTheDocument()
        expect(lastInput).toEqual(lastInput)
        
    })

    test("when click a edit button a new value insert to the todo" ,()=>{
        const con = render(<App/>)
        let newvalue = "hello there"
        const lastInput = con.getAllByRole("Todo_text_con")[0].firstChild
        const editBtn  = con.getByRole(/editing/i)
        fireEvent.click(editBtn)
        const newInput = con.getByRole(/editing_input/)
        fireEvent.change(newInput , {target:{value:newvalue}})
        const edit = con.getByRole(/editing_btn/)
        fireEvent.click(edit)
        expect(lastInput.innerHTML).toBe(newvalue)
    })
})
