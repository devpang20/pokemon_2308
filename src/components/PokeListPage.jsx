import { useCallback, useEffect, useMemo, useState } from "react"
import { NavLink, Link } from "react-router-dom";

function PokeListPage() {
  const [loding, setloading] = useState(true)
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const totalCount = 1281;
  const limit = 30

  const showPrev = useCallback(() => {
    setOffset(offset - limit)
  }, [offset])

  const showNext = useCallback(() => {
    setOffset(offset + limit)
  }, [offset])

  // https://pokeapi.co/api/v2/pokemon/1/
  const getNumberFromUrl = (url) => {
    const urlList = url.split("/")
    return parseInt(urlList[urlList.length - 2])
  }

  const forPrintPokemons = useMemo(() => pokemons.map(pokemon => {
    const number = getNumberFromUrl(pokemon.url)
    const imgUrl = `https://cdn.jsdelivr.net/gh/PokeAPI/sprites/sprites/pokemon/${number}.png`
    return {
      number,
      imgUrl,
      ...pokemon
    }
  }), [pokemons])

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
        {forPrintPokemons.map((pokemon, index) =>  (
          <li 
            key={index} 
            style={{
              display: "flex", 
              alignItems:"center", 
              borderBottom:"1px solid black"
            }}
          >
            <span>{pokemon.number}</span>
            <img 
              src={pokemon.imgUrl}
              alt="포켓몬이미지" 
            />
            <Link to={`/pokes/${pokemon.number}`}>
                <span>{pokemon.name}</span>
            </Link>
          </li>
        ))} 
      </ul> 
      { totalCount > offset + limit && <button onClick={showNext}>이후</button> }      
    </>
  )
     
}

export default PokeListPage;