import React from 'react'
import { useContext } from 'react'
import './../Scss/components/_Product.scss'


const Product = ({ id, image_small_url, brands, nutriscore_grade, origins, generic_name_fr_imported, abbreviated_product_name }) => {



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
                <button className='add_to_list'> Ajouter à la liste </button>
            </figure>
        </li>
    )
}

export default Product 