import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../components/Nav'
import List from '../../components/List'
import Footer from '../../components/Footer'

const Lists = () => {
   const [userList, setUserList] = useState('');
   const [test , setTest] = useState([
        {
        _id: '669711a529eccd74148eee94',
        name: 'fzz',
        productsList: [],
        favorits: [],
        dateAdded: "2024-07-17T00:34:45.937Z",
        __v: 0
      },
      {
        _id: '66971d93a7b8212bdbcb5499',
        name: 'azzs',
        productsList: [],
        favorits: [],
        date: "2024-07-17T01:25:39.400Z",
        __v: 0
      },
      {
        _id: '6697b3de6371091972744671',
        name: 'fzz',
        productsList: [],
        favorits: [],
        date: "2024-07-17T12:06:54.154Z",
        __v: 0
      },
      {
        _id: '6697d3d04a04aec341657bee',
        name: 'fzz',
        productsList: [],
        favorits: [],
        date: "2024-07-17T14:23:12.474Z",
        __v: 0
      },
      {
        _id: '66997c5c66c60041224d0558',
        name: 'ma liste',
        productsList: [],
        favorits: [],
        date: "2024-07-18T20:34:36.418Z",
        __v: 0
      },
      {
        _id: '669a9de5d2b4e6d50e2f0de3',
        name: 'testuser',
        productsList: [],
        favorits: [],
        date: "2024-07-19T17:09:57.905Z",
        __v: 0
      }
   ])

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
    console.log(typeof test)
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
                <p>test</p>
                <div>
                {
                  userList && userList.map((item) => {
                       return <div>{item.dateAdded}</div>
                    })
                }
                </div>

                </section>
               <section>
                <ul>
                    {userList && userList.map(({_id, listName, dateAdded}) => {
                    //Solution non définitive, trouver pourquoi l'affichage se fait qu'au "RETURN"
                       return <List
                                key = {_id}
                                id = {_id}
                                listName = {listName}
                                dateAdded = {dateAdded}
                            />


                        })
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