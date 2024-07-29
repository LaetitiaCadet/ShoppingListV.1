import React, {useState } from "react";
// import { userProfil } from "../reducers/action";
// import { useDispatch, useSelector } from "react-redux"

const CreateList = () => {
    const [newList , setNewlist] = useState('');
    const [success , setSuccess] = useState(Boolean); 

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
            setSuccess(true)
        } catch (error){
            console.log(error.response)
        } 
        console.log(success)
    }

    const handleSubmitNewList = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.target)
        console.log("nom:" + newList)
        createNewList()   
    }

    return  (

        <div>
            {/* //Button trigger modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
             Nouvelle Liste
            </button>

            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form method="POST">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Nouvelle liste de produit</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="newList" className="visually-hidden">Nom de la nouvelle list:</label>
                                <input type="text" className="form-control" id="newList" onChange={handleNewListInputChange} placeholder="ex. Dinner avec les voisins !"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <a className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmitNewList} >Créer</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {
                success ? <p>Votre liste a bien été crée !</p> : null
            }
        </div>
    )
}

export default CreateList