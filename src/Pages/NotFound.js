import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav"
import Footer from "../components/Footer";
import "../Scss/pages/NotFound.scss"

function NotFound(){
    return (
        <div className="App">
            <header>
                <Nav/>
                <section className="notFound">
                    <h1>404</h1>
                    <p>Oups! La page que vous demandez n'existe pas.</p>
                    <span><Link to="/">Retourner sur la page d'accueil</Link></span>
                </section>
            </header>
            <Footer/>
        </div>
    )
}

export default NotFound;