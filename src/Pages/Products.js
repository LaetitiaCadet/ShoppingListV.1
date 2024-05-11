import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../Scss/App.scss";

function Products() {
    const [data, setData] = useState();
    const url = "https://fr-en.openfoodfacts.org/category/pizzas.json"


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const pizzas = await response.json()
            setData(pizzas.products)
        }
        fetchData()
            .catch(console.error)
    }, [])


    return (
        <div className="App">
            <Nav />
            <header>
                Products List
                <SearchBar></SearchBar>
                <ul className="Product-Card">
                    {data && data.map(({ id, brands, image_small_url, nutriscore_grade, origins, generic_name_fr_imported }) =>

                        <Product
                            id={id}
                            brands={brands}
                            image_small_url={image_small_url}
                            nutriscore_grade={nutriscore_grade}
                            origins={origins}
                            generic_name_fr_imported={generic_name_fr_imported}
                        />
                    )}
                </ul>
            </header>

            <Footer />
        </div>
    )
}

export default Products;