import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav'
import List from '../../components/List'
import Footer from '../../components/Footer'

const Lists = () => {
   const [userList, setUserList] = useState('');
   const navigate = useNavigate()
   const token = sessionStorage.getItem('user')
   
   const getAllLists = async () => { 
      try {
        const response = await fetch('http://localhost:5000/lists', {
            headers:{
                'Accept': 'application/json',
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + token
            },
        })
        let data = await response.json();
        let list = data
        if (data.status === 200){
            console.log(list.lists)
           setUserList(list.lists)
           return list
        }

      } catch (error){
          console.error(error)
      }
  } 

   useEffect(()=> {
    getAllLists()
    console.log(userList)
  },[navigate, token])

 return (
    <div>
      { token ?
         <div className='App'>
            <header>
               <Nav/>
               <h1>Mes listes</h1>
               <p>Ici sont regrouper toutes tes listes</p>
            </header>
            <main>
               <section>
                <ul>
                    {userList && userList.map(({_id, listName, dateAdded}) =>
                              <List
                                key = {_id}
                                id = {_id}
                                listName = {listName}
                                dateAdded = {dateAdded}
                            />)
                    }
                </ul>
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

export default Lists;