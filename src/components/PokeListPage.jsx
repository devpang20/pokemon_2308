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
      <div className="m-2">
        <div className="badge badge-success">{offset}</div>
        { offset > 0 && <button className="btn btn-sm btn-success" onClick={showPrev}>이전</button> }
        { totalCount > offset + limit && <button className="btn btn-sm btn-success" onClick={showNext}>이후</button> }   
      </div>
      <hr />
      <div className="con-1 w-full h-screen max-w-7xl mx-auto">
        <h1 className="header text-2xl">포켓몬 리스트</h1>
        <ul className="flex flex-wrap gap-4 mt-2">
            {forPrintPokemons.map((pokemon, index) =>  (
            <li 
                key={index}
                className="card card-compact w-72 bg-base-100 shadow-xl"
            >
                <div className="card-body">
                    <div className="badge badge-primary badge-outline">{pokemon.number}</div>
                    <img 
                    src={pokemon.imgUrl}
                    alt="포켓몬이미지" 
                    />
                    <Link to={`/pokes/${pokemon.number}`}>
                        <div className="font-bold">{pokemon.name}</div>
                    </Link>
                </div>
            </li>
            ))} 
        </ul> 
      </div>   
    </>
  )
     
}

export default PokeListPage;