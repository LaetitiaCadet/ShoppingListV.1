import React from 'react';
import "../Scss/components/_Information.scss";


function Information ({ id, title, description, host, rating, location, equipments,tags}) {
    let parseRating = parseInt(rating)

    return(
        <div key={id} className="information-box">
            <div className='host-presentation'>
                <div className='row'>
                    <div className='col-10 title-location'>
                        <h2>{title}</h2>
                        <p>{location}</p>
                        {tags.map(tag => <span className="badge bg-primary">{tag}</span> )}
                    </div>
                    <div className='col-2 host-title'>
                            <div className='host-id'>
                                <p className='host-name'>{host.name}</p>
                                <img className='host-profil' src={host.picture} alt={host.name}/>
                                <br></br>
                            </div>
                            <div className='host-rating'>
                                    {
                                        [...new Array(parseRating)].map(el=><span className='starred'></span>)
                                        
                                    }{
                                        [...new Array(5 - parseRating)].map(el=><span className='notStarred'></span>)
                                    }
                            </div>
                    </div>
                </div>
            </div>
            <div className="row" id="host-description">
                    <div className="col">
                        <button
                        className="btn btn-primary w-100"
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#descriptionCollapse" 
                        aria-expanded="false" 
                        aria-controls="descriptionCollapse">
                            Description
                            <span className="expand"></span>
                        </button>
                        <div className="collapse multi-collapse" id="descriptionCollapse">
                                <div className="card card-body w-100">
                                    {description}
                                </div>
                        </div>
                    </div>

                    <div className="col">
                        <button 
                        className="btn btn-primary w-100" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#equipmentCollapse" 
                        aria-expanded="false" 
                        aria-controls="equipmentCollapse">
                            Equipements
                            <span className="expand"></span>
                        </button>
                        <div className="collapse multi-collapse" id="equipmentCollapse">
                            <div className="card card-body w-100">
                            {equipments.map(equipment => <p>{equipment}</p> )}
                            </div>
                        </div>
                    </div>
                </div>
     
        </div>
    )
    
}

export default Information