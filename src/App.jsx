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
  

  // https://pokeapi.co/api/v2/pokemon/1/
  const getNumberFromUrl = (url) => {
    const urlList = url.split("/")
    return parseInt(urlList[urlList.length - 2])
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
      <hr />
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index} style={{display: "flex", alignItems:"center", borderBottom:"1px solid black"}}>
            <span>{getNumberFromUrl(pokemon.url)}</span>

            <img 
              src={`https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${getNumberFromUrl(pokemon.url)}.png`}
              alt="포켓몬이미지" 
            />
            <span>{pokemon.name}</span>
          </li>
        ))} 
      </ul> 
      { totalCount > offset + limit && <button onClick={showNext}>이후</button> }
      
    </>
  )
}

export default App
