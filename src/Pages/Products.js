import React, { useEffect, useState } from "react";
import { SearchContext } from "../hook/useSearch"
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";


function Products() {
    const [data, setData] = useState();

    const [resultSearch, setResultSearch] = useState("");
    // const url = "https://fr-en.openfoodfacts.org/category/pizzas.json"


    /* The `useEffect` hook in the code snippet is used to perform side effects in a functional component.
    In this case, it is fetching data from the specified URL when the component mounts (since the
    dependency array `[]` is empty, indicating it should only run once after the initial render). */
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(url);
    //         const pizzas = await response.json()
    //         setData(pizzas.products)
    //     }
    //     fetchData()
    //         .catch(console.error)
    // }, [])


    return (
        <div className="App">
            <Nav />
            <header>
                Products List
                <SearchContext.Provider value={{ resultSearch, setResultSearch }}>
                    <SearchBar></SearchBar>
                </SearchContext.Provider>
            </header>
            <Footer />
        </div>
    )
}

export default Products;