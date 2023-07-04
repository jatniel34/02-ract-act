import React, {useState, useEffect} from 'react'

const SearchComponent = () => {
  //setear los hooks useState
  const  [ users, setUsers ] = useState([ ])
  const  [ search, setSearch] = useState ("")
  //funncion para traer los datos API
  const URL = 'https://api.github.com/repos/facebook/react/issues'

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
    console.log(users);
      results =users
   } else {
     results = users.filter ( (dato) =>
    dato.title.toLowerCase().includes(search.toLocaleLowerCase())
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
                <th>ID</th>
                <th>Titulo</th>
                <th>Nombre Usuario</th>
                <th>Labels</th>
            </tr>
          </thead>
          <tbody>
            { results.map ( (user)  => (
                <tr key= {user.id}>
                    <td>{user.id}</td>
                    <td> <a href={user.html_url}>{user.title}</a> </td>
                    <td>{user.user.login}</td>
                    <td>{
                       user.labels.map((label) => ( <li>Nombre: {label.name}</li> ))
                    }</td>
                </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default SearchComponent