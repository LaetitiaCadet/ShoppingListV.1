import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { SearchContext } from '../hook/useSearch';
import { SpinnerLoader } from './spinnerLoader';
import { useNavigate } from 'react-router-dom';
import "../Scss/App.scss";

const SearchBar = () => {

    const [terms, setTerms] = useState("");
    const { resultSearch, setResultSearch } = useContext(SearchContext);
    const [loading, setLoading] = useState("")
    const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${terms}&search_simple=1&action=process&json=1`
    const navigate = useNavigate();

    const handleSearchInputChange = (e) => {
        e.persist()
        let value = e.target.value;
        setTerms(value)
    }

    const fetchSearchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(searchUrl);

            if (response.ok) {
                console.log("Promise resolved and HTTP status is successful")
                const results = await response.json();
                setResultSearch(results.products)
                setTimeout(() => {
                    navigate("/SearchResult", { state: { terms } })
                }, 7000);

                setLoading(false)
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
        e.stopPropagation()
        if (terms === "") {
            alert("Veuillez saisir un produit ou un ingredient")
        } else {
            fetchSearchData()
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="search-bar">
                    <input
                        type='text'
                        name="input-search"
                        id="input-search"
                        onChange={handleSearchInputChange}
                        placeholder="Rechercher un produit" />
                    {/* <p onClick={fetchSearchData}>Test</p> */}

                </div>
                <button type="submit" id="submit-search">Entrer</button>
            </form>
            {
                loading ? <SpinnerLoader /> : null
            }


        </div>
    )
}

export default SearchBar