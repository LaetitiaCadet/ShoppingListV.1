import React, { useState } from "react";

const List = () => {
    const [newList , setNewlist] = useState('')

    const handleNewListInputChange = (e) => {
        e.persist();
        setNewlist(e.target.value)
        console.log(e.target.value)
    } 

    const handleSubmitNewList = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(newList)
    }

    return  (
        <div>
            <form method="POST">
              <div className="col-auto">
                <label htmlFor="newList" className="visually-hidden">Nom de la nouvelle list:</label>
                <input type="text" className="form-control" id="newList" onChange={handleNewListInputChange} placeholder="ex. Dinner avec les voisins !"/>
            </div>
            <div className="col-auto">
                <a type="submit" className="btn btn-primary mb-3" onSubmit={handleSubmitNewList}>Créer</a>
            </div>
            </form>
        </div>
    )
}

export default List