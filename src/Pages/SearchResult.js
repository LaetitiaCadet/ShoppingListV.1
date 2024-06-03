import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SearchContext } from '../hook/useSearch'
import SpinnerLoader  from '../components/spinnerLoader';
import SearchBar from '../components/SearchBar'
import Product from '../components/Product'
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const SearchResult = () => {
    const [resultSearch, setResultSearch] = useState()
    const [terms, setTerms] = useState()
    const [loading, setLoading] = useState("");
    const params = new URLSearchParams(window.location.search)

    const updateInputValue = () => {
        setTerms(params.get('value'))
        
    } 
    
    
    useEffect(() => {
        const fetchDataSearch = async () => { 
            console.log("waiting for data . . .")
            await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${terms}&search_simple=1&action=process&json=1`) 
            .then(response => response.json() 
            .then(data => {
              console.log("success !")
              setResultSearch(data.products)
             })
            .catch(error => {
                console.log(error)
                throw(error)
            })
            )
        } 
        fetchDataSearch()
    },[])

    if (resultSearch === undefined) {
        return <SpinnerLoader/>;
    }
    
    return (
        <div className='App'>
            <Nav />
            <header>
            <SearchContext.Provider value={{ resultSearch, setResultSearch, terms}}>
                <h1>Resultat de la recherche "{terms}" :</h1>
                    <SearchBar></SearchBar>
                    <ul className="Product-Cards">
                        {resultSearch && resultSearch.map(({ id, brands, image_small_url, nutriscore_grade, origins, generic_name_fr_imported, abbreviated_product_name }) =>
                            <Product
                                key={id}
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