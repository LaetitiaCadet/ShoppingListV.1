import React, { useEffect, useState } from "react";
import { userProfil } from "../reducers/action";
import { useDispatch, useSelector } from "react-redux"

const List = () => {
    const [newList , setNewlist] = useState('')

    const token = sessionStorage.getItem('user')

    const handleNewListInputChange = (e) => {
        e.persist();
        setNewlist(e.target.value)
        console.log(e.target.value)
    }
    
    const getAllLists = async () => {
        try {
            await fetch('http://localhost:5000/lists', {
                headers:{
                    // 'Accept': 'application/json',
                    // "Content-Type": "application/json",
                    'Authorization': 'Bearer' + token
                },
            }).then((response) => {
                if(response.status === 200){
                    console.log(response)
                }
            })
        } catch (error){
            console.log(error.response)
        }
    }

    const createNewList = async () => {
        console.log("save new list ...")
        try {
            await fetch('http://localhost:5000/lists', {
                method:"POST",
                headers:{
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + token
                },
                body: JSON.stringify({
                    name: newList
                })
            }).then((response) => {
                if(response.status === 200){
                    console.log(response)
                }
            })
        } catch (error){
            console.log(error.response)
        } 
    }

    const handleSubmitNewList = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("nom:" + newList)
        createNewList()   
    }

    useEffect(() =>{
        getAllLists()

    }, [])


    return  (
        <div>
            <form method="POST">
              <div className="col-auto">
                <label htmlFor="newList" className="visually-hidden">Nom de la nouvelle list:</label>
                <input type="text" className="form-control" id="newList" onChange={handleNewListInputChange} placeholder="ex. Dinner avec les voisins !"/>
            </div>
            <div className="col-auto">
                <a className="btn btn-primary mb-3" onClick={handleSubmitNewList}>Créer</a>
            </div>
            </form>
        </div>
    )
}

export default List