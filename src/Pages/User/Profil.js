import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav'
import List from '../../components/lists'
import SearchBar from '../../components/SearchBar'
import Footer from '../../components/Footer'

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
         <div className='App'>
            <header>
               <Nav/>
               <h1>Bonjour { name ? name : "cher utilisateur"}</h1>
               <p>Citation du jour</p>
            </header>
            <main>
               <section>
                  <p>Pour commencer crée toi une liste afin d'y enregistré les produits qui t'intéresse</p>
                  <List></List>
                  <p>En suite utilise la barre de recherche des produits ci-dessous ! </p>
                  <SearchBar></SearchBar>
               </section>
            </main>


         </div>
      :
      <div>
         <h1>Une erreur est survenue</h1>
      </div> 
   }
   <Footer></Footer>
   </div>
 )
}

export default Profil; 