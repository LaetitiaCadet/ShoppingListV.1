import React from 'react'
import { useState } from 'react'
import Product from "../components/Product";

const SearchBar = () => {

    const [keyword, setKeyWord] = useState("");
    const [resultData, setResultData] = useState();
    const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${keyword}&search_simple=1&action=process&json=1`

    console.log(resultData)
    const handleSearchInputChange = (e) => {
        e.persist()
        let value = e.target.value;
        setKeyWord(value)

    }


    const fetchSearchData = async () => {
        const response = await fetch(searchUrl);
        const results = await response.json();
        setResultData(results)
        console.log(resultData)
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

        </div>
    )
}

export default SearchBar