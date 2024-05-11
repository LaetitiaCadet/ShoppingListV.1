import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../Scss/pages/About.scss';

function about(){
    return (
        <div className="App">
            <header>
                <Nav/>
                <header className="Header-Img-About"></header>
            </header>
            <div className="row" id="about">
                <div className="col-9">
                    <button
                    className="btn btn-primary"
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#multiCollapseExample1" 
                    aria-expanded="false" 
                    aria-controls="multiCollapseExample1">
                        Fiabilité
                        <span className="expand"></span>
                    </button>
                    <div className="collapse multi-collapse" id="multiCollapseExample1">
                            <div className="card card-body">
                            La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.                            </div>
                    </div>
                </div>

                <div className="col-9">
                    <button 
                    className="btn btn-primary " 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#multiCollapseExample2" 
                    aria-expanded="false" 
                    aria-controls="multiCollapseExample2">
                        Respect
                        <span className="expand"></span>
                    </button>
                    <div className="collapse multi-collapse" id="multiCollapseExample2">
                        <div className="card card-body">
                            La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.
                        </div>
                    </div>
                </div>

                <div className="col-9">
                    <button 
                    className="btn btn-primary" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#multiCollapseExample3" 
                    aria-expanded="false" 
                    aria-controls="multiCollapseExample2 multiCollapseExample3">
                        Service
                        <span className="expand"></span>
                    </button>
                    <div className="collapse multi-collapse" id="multiCollapseExample3">
                        <div className="card card-body">
                            La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <button 
                    className="btn btn-primary" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#multiCollapseExample4" 
                    aria-expanded="false" 
                    aria-controls="multiCollapseExample3 multiCollapseExample4">
                        Responsabilité
                        <span className="expand"></span>
                    </button>
                    <div className="collapse multi-collapse" id="multiCollapseExample4">
                        <div className="card card-body">
                            La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme.
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default about;