import { useEffect, useState } from "react"

function App() {

  const [loding, setloading] = useState(true)
  const [pokemons, setPokemons] = useState([])

  //api "https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(reponse => reponse.json())
      .then(data => {
          setPokemons(data.results)
          setloading(false)
        }
      )
  }, [])

  if ( loding ) {
    return "로딩 중..."
  }


  return (
    <>
      <ul>
        {pokemons.map((pokemon, index) => (<li key={index}>{pokemon.name}</li>))} 
      </ul> 
    </>
  )
}

export default App
