import React, {useState, useEffect} from 'react'

const SearchComponent = () => {
  //setear los hooks useState
  const  [ users, setUsers ] = useState([ ])
  const  [ search, setSearch] = useState ("")
  //funncion para traer los datos API
  const URL = 'https://jsonplaceholder.typicode.com/users'

  const showData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setUsers(data)
  }
  //console.log("hola mundo")

  //función de busqueda
  const searcher = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

   //metodo de filtrado
   let results = [ ]
   if(!search)
   {
      results =users
   } else {
     results = users.filter ( (dato) =>
    dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
   }

  useEffect( () => {
    showData()
  }, [])
  //rendizamos la vista
  return (
    <div>
      <input value={search} onChange={searcher} type='text '  placeholder='Search' className = 'form-control'/>

      <table className='table table-striped table-hover mt-5 shadow-lg'>
          <thead>
            <tr className='bg-curso text-white'>
                <th>Nombre</th>
                <th>ID Use</th>
            </tr>
          </thead>
          <tbody>
            { results.map ( (user)  => (
                <tr key= {user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default SearchComponent