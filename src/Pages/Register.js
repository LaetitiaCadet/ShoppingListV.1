import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmail, addName, addPassword} from "../reducers/registerSlice"
import { userRegister } from "../reducers/action";
import { useDispatch, useSelector } from "react-redux"
import Nav from "../components/Nav"
import Footer from "../components/Footer";
import "../Scss/pages/Register.scss"

const Register = () => {
    // const {errorMsg, serverMsg} = useSelector((state) => state.register)
    const name = useSelector((state) => state.userRegister.name)
    const email = useSelector((state) => state.userRegister.email)
    const password = useSelector((state) => state.userRegister.password)
    const success = useSelector((state) => state.userRegister.isSuccess)
    console.log(name)
    const currentState = useSelector((state) => state.userRegister)
    console.log(currentState)
    // console.log(name, email , password)
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServeurError] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleNameInputChange = (e) => {
        e.persist();
        dispatch(addName(e.target.value))
    }

    const handleEmailInputChange = (e) => {
        e.persist();
        dispatch(addEmail(e.target.value))
    }

    const handlePasswordInputChange = (e) => {
        e.persist();
        dispatch(addPassword(e.target.value))
    }

    const registerUser = async () => {
        dispatch(userRegister({name, email, password}))
        .then(() => navigate('/login'))
    }
    
    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')
        setNameError('')

        if ('' === name || name.length < 3){
            setNameError('Veuillez saisir votre prénom')
        }
        else if ('' === email){
            setEmailError('Veuillez saisir votre email')  
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setEmailError('Veuillez saisir une adresse email valide')
        } else if('' === password){
            setPasswordError('Veuillez saisir votre mot de passe')
        } else if(password.length < 7){
            setPasswordError('Votre mot de passe doit contenir 8 characters minimum')
        } else if (password !== confirmPassword){
            setPasswordError('Les deux mots de passe sont différent')
        }
         else {
            registerUser() 
        }
          
    }
    return (
        <div>
            <header>
                <Nav/>
                <section className="register-content">
                        <h1>S'inscrire</h1>
                        <form method="POST" >
                            <div className="input-wrapper">
                                <label htmlFor="name">Prénom</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Entrez votre adresse name"
                                    onChange={handleNameInputChange}
                                />
                                <span className="errorLabel">{nameError}</span>
                            </div>
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
                            <div className="input-wrapper">
                                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirmation du mot de passe"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {serverError ? <p className="errorLabel">{serverError}</p> : null}
                            <input type="button" className="register_button" onClick={onButtonClick} value={'Valider mon inscription'} placeholder="Valider mon inscription"/>
                        </form>
                </section>
            </header>
            <Footer/>
        </div>
    )
}

export default Register;