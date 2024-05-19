import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { SearchContext } from '../hook/useSearch'
import SearchBar from '../components/SearchBar'
import Product from '../components/Product'
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const SearchResult = () => {
    const [resultSearch, setResultSearch] = useState("")


    console.log(resultSearch)
    let { termsUrl } = useParams()
    return (
        <div className='App'>
            <Nav />
            <header>
                <h1>Resultat de la recherche "{termsUrl}" :</h1>
                <SearchContext.Provider value={{ resultSearch, setResultSearch }}>
                    <SearchBar></SearchBar>
                    <ul className="Product-Cards">
                        {resultSearch && resultSearch.map(({ id, brands, image_small_url, nutriscore_grade, origins, generic_name_fr_imported, abbreviated_product_name }) =>
                            <Product
                                id={id}
                                brands={brands}
                                image_small_url={image_small_url}
                                nutriscore_grade={nutriscore_grade}
                                origins={origins}
                                generic_name_fr_imported={generic_name_fr_imported}
                                abbreviated_product_name_fr={abbreviated_product_name}
                            />
                        )}
                    </ul>
                </SearchContext.Provider>
            </header>
            <Footer />

        </div>
    )
}

export default SearchResult;