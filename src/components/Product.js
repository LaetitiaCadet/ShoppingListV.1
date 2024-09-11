import React, { useEffect } from 'react'
import {useState} from "react";
import { getUserLists } from '../reducers/action';
import { useDispatch, useSelector } from "react-redux"
import './../Scss/components/_Product.scss'



const Product = ({ id, image_small_url, brands, nutriscore_grade, origins, generic_name_fr_imported, abbreviated_product_name }) => {

    const [success , setSuccess] = useState(Boolean);
    const [data, setData] = useState();
    const lists = useSelector((state) => state.userLogged.userLists)
    const token = sessionStorage.getItem('user')
    const dispacth = useDispatch()
    

    const addToList = () => {
        const product = {
            id: id,
            name: generic_name_fr_imported,
            brand : brands,
            image : image_small_url,
            nutriscore: nutriscore_grade,
        }
        console.log(product)
    }

    useEffect(() => {
        dispacth(getUserLists({token}))
    },[])

    return (
        <li className='Product' id={id} key={id}>
            <figure>
                <img className='Product-cover' src={image_small_url} alt={generic_name_fr_imported} />
                <figcaption className='Product-title'>
                    <h4>{abbreviated_product_name}</h4>
                    <h5>{brands}</h5>
                    <p>{generic_name_fr_imported}</p>
                    <p>Origine: {origins}</p>
                    <p>Nutri-score: {nutriscore_grade}</p>
                </figcaption>
                <div className="Product-buttons">
                    <button className='add_to_list' onClick={addToList} data-bs-toggle="modal" data-bs-target="#selectList"> Ajouter à la liste </button>
                    <button className='add_to_favorit'><i class="fa-solid fa-heart fa-lg"></i></button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="selectList" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="selectListLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form method="POST">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="selectListLabel">Enregistré le produit dans ma liste</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Selectionnez une liste
                                        </button>
                                        <ul class="dropdown-menu">
                                            {
                                                lists && lists.map(({listName}) => <li><a class="dropdown-item" href="#">{listName}</a></li>)
                                            }
                                        </ul>
                                        </div>
                                    </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                    <a className="btn btn-primary" data-bs-dismiss="modal">Enregistré</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {
                success ? <p>Votre liste a bien été crée !</p> : null
                }
            </figure>
        </li>
    )
}

export default Product 