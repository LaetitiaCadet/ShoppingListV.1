import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "../Scss/App.scss";

const SearchBar = () => {
    const [terms, setTerms] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    
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
        } else {
            console.log(terms)
            console.log('submit terms')
            setSubmit(true)
            navigate(`/SearchResult?value=${terms}`)
        }
        console.log(terms)
    }
 
   
    return (
        <div>
            <form method='GET' onSubmit={handleSubmit}>
                <div className="search-bar">
                    <input
                        type='text'
                        name="inputSearch"
                        id="inputSearch"
                        onChange={handleSearchInputChange}
                        placeholder="Rechercher un produit" />
                    {/* <p onClick={fetchSearchData}>Test</p> */}
                </div>
                <button type="submit" id="submit-search">Entrer</button>
            </form>
        </div>
    )
}

export default SearchBar