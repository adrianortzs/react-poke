import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App () {
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemonData, setPokemonData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const searchPokemon = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      setPokemonData(response.data)
    } catch (error) {
      setErrorMessage('Pokémon no encontrado')
      setPokemonData(null)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setPokemonData(null)
      setErrorMessage('')
      return
    }
    searchPokemon()
  }, [searchTerm])

  return (
    <div>
      <h1>Buscador de Pokémon</h1>
      <div>
        <input
          type="text"
          placeholder="Ingrese el nombre del Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchPokemon}>Buscar</button>
      </div>
      {isLoading && <p>Cargando...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  )
}

export default App