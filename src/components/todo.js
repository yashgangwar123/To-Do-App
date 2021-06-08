import React, { useEffect, useState } from "react";
import "./todo.css"
import todoicon from "../images/todoicon.png"

//To get data from local storage
const getLocalItems = () => {
    let list = localStorage.getItem('list')

    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}




export default function Todo() {

    let [inputData, setInputData] = useState('')
    let [items, setItems] = useState(getLocalItems())
    let [toggleSubmit, setToggleSubmit] = useState(true)
    let [isEditItem, setIsEditItem] = useState(null)

    const addItem = () => {
        if (!inputData) {
            alert("Please write something in the input box")
        } else if (inputData && !toggleSubmit) {
            setItems(
                items.map((item) => {
                    if (item.time == isEditItem) {
                        return { ...item, data: inputData }
                    }
                    return item;
                })
            )
            setToggleSubmit(true)
            setInputData('')
            setIsEditItem(null)
        } else {
            let today = new Date()
            let allInputData = {
                data: inputData,
                date: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
                time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
            }
            setItems([...items, allInputData])
            setInputData('')
        }
    }


    const deleteItem = (index) => {
        const updateItems = items.filter((item) => {
            return index != item.time
        })

        setItems(updateItems)
    }


    const removeAll = () => {
        setItems([])
    }


    const editItem = (id) => {
        let newEditItem = items.find((item) => {
            return item.time == id
        })
        console.log(newEditItem);
        setToggleSubmit(false)
        setInputData(newEditItem.data)
        setIsEditItem(id)
    }


    // To add data to local Storage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items))
    }, [items])







    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todoicon} alt="todologo"></img>
                        <figcaption>Add your list here 👇</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍ Add items"
                            value={inputData}
                            onChange={(event) => {
                                setInputData(event.target.value)
                            }}
                            onKeyUp={(event) => {
                                if (event.key == "Enter") {
                                    addItem()
                                }
                            }}></input>
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                <i className="fa fa-pencil-alt add-btn" title="Update Item" onClick={addItem}></i>
                        }

                    </div>


                    <div className="showItems">
                        {
                            items.map((item, index) => {
                                return (
                                    <div className="each" key={item.time}>
                                        <div className="eachItem">
                                            <h3>{item.data}</h3>
                                            <div className="todo-btn">
                                                <i className="far fa-edit" title="Edit Item" onClick={() => editItem(item.time)}></i>
                                                <i className="far fa-trash-alt" title="Delete Item" onClick={() => deleteItem(item.time)}></i>
                                            </div>
                                        </div>
                                        <div className="datetime">
                                            <span className="time">{item.time}</span>
                                            <span className="date">{item.date}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}