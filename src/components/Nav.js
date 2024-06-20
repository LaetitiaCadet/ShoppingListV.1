import React from "react";
import {
    Link
} from "react-router-dom";

import "../Scss/components/_Nav.scss";


function Nav() {
    return (
        <div>
            <nav className="Navbar">
                <Link to="/"><h3 alt="Logo">Shopping List V.1</h3></Link>
                <ul className='Nav-items'>
                    <li>
                        <Link to="/login">Se connecter</Link>
                    </li>
                    <li>
                        <Link to="/register">S'inscrire</Link>
                    </li>
                    <li>
                        <Link to="/about">A propos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}



export default Nav;
