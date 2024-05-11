import React from 'react'
import './../Scss/components/_Product.scss'

const Product = ({ id, image_small_url, brands, nutriscore_grade, origins, generic_name_fr_imported }) => {
    return (
        <li className='Product' id={id}>
            <figure>
                <img className='Product-cover' src={image_small_url} alt={generic_name_fr_imported} />
                <figcaption className='Product-title'>
                    <h4>{brands}</h4>
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