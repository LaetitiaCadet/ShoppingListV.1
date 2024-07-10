import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import "../Scss/components/_Nav.scss";


const Nav = () => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('user')

    const LogOut = (e) => {
        e.preventDefault()
        sessionStorage.removeItem('_id')
        sessionStorage.clear()
        navigate('/', {replace:true})
    }


    return (
        <div>
            <nav className="Navbar">
                <Link to="/"><h3 alt="Logo">Shopping List V.1</h3></Link>
                <ul className='Nav-items'>
                    {
                        token ?                  
                        <li>
                            <Link to="/List">Mes Listes</Link>
                            <Link to="/Account">Compte</Link>
                            <Link to="/Farovis">Favori</Link>
                            <Link onClick={LogOut} className="nav-link"><i className="fa-sharp fa-solid fa-arrow-right-from-bracket me-2"></i>Déconnexion</Link>
                        </li>  
                        :
                        <li>
                            <Link to="/login">Se connecter</Link>
                            <Link to="/register">S'inscrire</Link>
                            <Link to="/about">A propos</Link>
                        </li>
                    }

                </ul>
            </nav>
        </div>
    )
}

export default Nav;
