import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav'
import SearchBar from '../../components/SearchBar'

const Profil = () => {
   const [name, setName] = useState()
   const navigate = useNavigate()
   const token = sessionStorage.getItem('user')
   

   useEffect(()=> {
      const fetchData = async() => {
         try{
            await fetch("http://localhost:5000/profil", {
               method: "POST",
               headers:{
                  authorization : "Bearer" + token  
               },
            })
            .then(response => response.json())
            .then(data => {
               let user = data
               console.log(user)
               setName(user.name)
               if (data.status !== 200){
                  setTimeout(() => {
                     navigate('/login')
                  }, 2000)
               }
            })
         } catch (err) {
            console.log(err)
         }
      }
      fetchData()
  },[navigate, token])
 return (
    <div>
      { token ?
         <div>
            <header>
               <Nav/>
            </header>
            <h1>Bonjour { name ? name : "cher utilisateur"}</h1>
            <p>Citation du jour</p>
            <SearchBar></SearchBar>
         </div>
      :
      <div>
         <h1>Une erreur est survenue</h1>
      </div> 
   }    
   </div>
 )
}

export default Profil; 