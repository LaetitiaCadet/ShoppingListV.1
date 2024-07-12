import React from 'react'
import { useState} from 'react'
import { SearchContext } from '../hook/useSearch'
import Product from '../components/Product'
import SpinnerLoader  from '../components/spinnerLoader';
import "../Scss/App.scss";

const SearchBar = () => {
    const [resultSearch, setResultSearch] = useState("")
    const [terms, setTerms] = useState("");
    const [isLoading, setIsLoading] = useState("")
    const [categorie, setCategorie] = useState("")
    // const [submit, setSubmit] = useState(false);
    
    const handleSearchInputChange = (e) => {
        e.persist()
        let value = e.target.value;
        setTerms(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (terms === "") {
            alert("Veuillez saisir un produit ou un ingredient")
        } else if (terms.length < 4) {
            alert ('Veuillez saisir au moins 4 lettre')
        } else {
            fetchDataSearch()
        }
    }

    const fetchDataSearch = async () => { 
        console.log("waiting for data . . .")
        setIsLoading(true)
        try {
            await fetch(`https://fr-en.openfoodfacts.org/cgi/search.pl?search_terms=${terms}&search_simple=1&action=process&json=1`) 
            .then(response => response.json() 
            .then(data => {
                console.log(data)
                console.log(data.products)
                console.log("success !")
                setResultSearch(data.products)
                setIsLoading(false)
             })
            )
        } catch (error) {
            console.log(error)
        }

    } 

    if (resultSearch === undefined) {
        return <SpinnerLoader/>;
    }
 
    return (
        <div>
             <header>
                <div className="search-bar">
                    <input
                        type='text'
                        name="inputSearch"
                        id="inputSearch"
                        onChange={handleSearchInputChange}
                        placeholder="Rechercher un produit" />
                    <p onClick={handleSubmit}>Test</p> 
                </div>
                <button type="submit" id="submit-search" onClick={handleSubmit}>Entrer</button>
             </header>
            <main>
                {isLoading ?
                    <SpinnerLoader/>
                    :
                    <SearchContext.Provider value={{ resultSearch, setResultSearch, terms}}>                    
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
                }

            </main>
        </div>
    )
}

export default SearchBar