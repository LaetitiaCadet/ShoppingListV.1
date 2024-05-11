import React from "react";
import {
    Link
} from "react-router-dom";

import "../Scss/components/_Nav.scss";


function Nav() {
    return (
        <div>
            <nav className="Navbar">
                <span alt="Logo">Shopping List V.1</span>
                <ul className='Nav-items'>
                    <li>
                        <Link to="/">Accueil</Link>
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
