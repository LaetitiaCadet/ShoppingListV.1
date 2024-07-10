import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../Scss/App.scss";


function Home() {
    return (
        <div className="App">
            <header>
                <Nav />
                <section className="Header-Img-Home">
                    <h1>Faire ça liste de course de manière plus efficace !</h1>
                </section>
            </header>
            <Link className="" to="/login">C'est partie !</Link>
            <Footer />
        </div>
    )
}

export default Home;