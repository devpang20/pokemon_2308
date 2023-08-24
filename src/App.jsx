import { useEffect, useState } from "react"

function App() {

  const [loding, setloading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const totalCount = 1281;
  const limit = 30

  const showPrev = () => {
    setOffset(offset - limit)
  }
  const showNext = () => {
    setOffset(offset + limit)
  }

  //api "https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    setloading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(reponse => reponse.json())
      .then(data => {
          setPokemons(data.results)
          setloading(false)
        }
      )
      .catch((err) => console.log("err", err))
  }, [offset])

  if ( loding ) {
    return "로딩 중..."
  }

  return (
    <>
      offset: {offset}
      { offset > 0 && <button onClick={showPrev}>이전</button> }

      <ul>
        {pokemons.map((pokemon, index) => (<li key={index}>{pokemon.name}</li>))} 
      </ul> 
      { totalCount > offset + limit && <button onClick={showNext}>이후</button> }
      
    </>
  )
}

export default App
