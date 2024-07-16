import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav"
import Footer from "../components/Footer";
import "../Scss/pages/Login.scss"
import { addEmail, addPassword} from "../reducers/loginSlice"
import { userLogin } from "../reducers/action";
import { useDispatch, useSelector } from "react-redux"



const Login = () =>{

    const email = useSelector((state) => state.userLogin.email)
    const password = useSelector((state) => state.userLogin.password)
    const success = useSelector((state) => state.userLogin.isSuccess)
    const currentState = useSelector((state) => state.userLogin)
    console.log(currentState)
    // const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    // const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('');
    const [token, setToken] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEmailInputChange = (e) => {
        e.persist();
        dispatch(addEmail(e.target.value))
    }

    const handlePasswordInputChange = (e) => {
        e.persist();
        dispatch(addPassword(e.target.value))
    }

    const loginUser = async () => {
        dispatch(userLogin({email, password}))
        .then(() => {
                navigate('/Profil')
        })
    }

    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')

        if ('' === email){
            setEmailError('Veuillez saisir votre email')  
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setEmailError('Veuillez saisir une adresse email valide')
        } else if('' === password){
            setPasswordError('Veuillez saisir votre mot de passe')
        } else if(password.length < 7){
            setPasswordError('Votre mot de passe doit contenir 8 characters minimum')
        } else {
            loginUser() 
        }
      
    }

    return (
        <div className="App">
            <Nav/>
            <header>
                <section className="login-content">
                    <h1>Se connecter</h1>
                    <form method="POST" >
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Entrez votre adresse email"
                                onChange={handleEmailInputChange}
                            />
                            <span className="errorLabel">{emailError}</span>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Entrez votre mot de passe"
                                autoComplete="current-password"
                                onChange={handlePasswordInputChange}
                            />
                            <span className="errorLabel">{passwordError}</span>
                        </div>
                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Se souvenir de moi</label>
                        </div>
                        <div className="not-account">
                            <p>Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link></p>
                            
                        </div>
                        <span className="errorLabel">{error}</span>
                        <input type="button" className="login_button" onClick={onButtonClick} value={'Connection'} placeholder="Connection"/>
                    </form>
                </section>
            </header>
            <Footer/>
        </div>
    )
}

export default Login;