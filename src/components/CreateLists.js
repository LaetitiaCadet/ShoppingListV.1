import React, {useState } from "react";
// import { userProfil } from "../reducers/action";
// import { useDispatch, useSelector } from "react-redux"

const CreateList = () => {
    const [newList , setNewlist] = useState(''); 

    const token = sessionStorage.getItem('user')

    const handleNewListInputChange = (e) => {
        e.persist();
        setNewlist(e.target.value)
        console.log(e.target.value)
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
                    listName: newList
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
            <ul>
                {/* { userList.map(({name, date})=> {
                        <li>
                            <h5>{name}</h5>
                            <p>{date}</p>
                        </li>
                    })
                } */}
            </ul>
        </div>
    )
}

export default CreateList