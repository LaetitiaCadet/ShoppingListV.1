import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import Product from './Product';
import { SearchContext } from '../hook/useSearch';
import { SpinnerLoader } from './spinnerLoader';
import "../Scss/App.scss";

const SearchBar = () => {

    const [keyword, setKeyWord] = useState("");
    const { resultSearch, setResultSearch } = useContext(SearchContext);
    const [loading, setLoading] = useState("")
    const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${keyword}&search_simple=1&action=process&json=1`

    const handleSearchInputChange = (e) => {
        e.persist()
        let value = e.target.value;
        setKeyWord(value)

    }

    const fetchSearchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(searchUrl);

            if (response.ok) {
                console.log("Promise resolved and HTTP status is successful")
                const results = await response.json();
                setLoading(false)
                setResultSearch(results.products)

            } else {
                if (response.status === 404) throw new Error('404, Not found');
                if (response.status === 500) throw new Error('500, internal server error');

                throw new Error(response.status);
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        console.log(resultSearch)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <form>
                <div className="search-bar">
                    <input
                        type='text'
                        name="input-search"
                        id="input-search"
                        onChange={handleSearchInputChange}
                        placeholder="Rechercher un produit" />
                    <button
                        type="submit"
                        id="submit-search"
                        onSubmit={handleSubmit}
                    >
                        Entrer
                    </button>

                    <p onClick={fetchSearchData}>Test</p>

                </div>

            </form>
            {
                loading ? (<SpinnerLoader />) : (
                    <ul className="Product-Card">
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

                )
            }


        </div>
    )
}

export default SearchBar