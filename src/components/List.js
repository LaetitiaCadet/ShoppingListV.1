import React from 'react'
import './../Scss/components/_Product.scss'


const List = ({ _id, listName, dateAdded}) => {
    return (
        <li className='List' id={_id} key={_id}>
                <div className='list-title'>
                    <h3>{listName}</h3>
                    <p>{dateAdded}</p>
                </div>
                <button className='modify_list'> Modifier la liste </button>
                <button className='delete_list'> Supprimer la liste </button>
        </li>
    )
}

export default List