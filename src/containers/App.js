import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import SearchButton from '../components/SearchButton';
import AddLineupButton from '../components/AddLineupButton';
import ErrorBoundry from '../components/ErrorBoundry';
import CardLineup from '../components/CardLineup';
import CardLineupList from '../components/CardLineupList';
import './App.css';

function App () {
    const [pokemons, setPokemons] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [mypokemons, setMypokemons] = useState([])
    // const [count, setCount] = useState(0)

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/pokemons")
            .then(res => res.json())
            .then(users => {setMypokemons(users)});
    },[mypokemons])

    async function getPokemon(params) {
		try {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
				body: JSON.stringify(params)
			};
			const response = await fetch(`http://localhost:3000/api/v1/pokemons/${params}`)
    		const data = await response.json();
			setPokemons(data)
		  } catch (err) {
			console.error('err', err);
		  }
	}
    
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
        // console.log(event.target.value);
        // getPokemon(event.target.value);
    }

    const onSearchClick = (event) => {
    //     // setSearchfield(event.target.value);
        // console.log(searchfield);
        getPokemon(searchfield);
    }

    const filteredPokemons = pokemons.filter(pokemon =>{
        return pokemon.name.toLowerCase();
    });
    const filteredMyPokemons = mypokemons.filter(pokemon1 =>{
        return pokemon1.name.toLowerCase();
    });

    // return !pokemons.length ?
    return(
        <div className='tc'>
            <h1 className='f3 white mb4'>Welcome to Pokemon League</h1>
                <article className="cf">
                <div className="fl w-60 tc">
                    <h1 className='f4 white mb2'>Pokemon Lineup</h1>
                        <div className="pokemon-line-up ml4">
                            <CardLineupList mypokemons={filteredMyPokemons} />
                        </div>
                        
                        <div className="pokemon-data mv4 ml4">
                            <h1 className='f4 white mb2'>Pokemon Data</h1>
                            <div className='center ba b--black-10 shadow-5 data'>

                            </div>
                        </div>
                </div>
                <div className="fl w-40 tc">
                    <h1 className='f4 white mb2'>Pokedex</h1>
                    <div className='pa2'>
                        <SearchBox searchChange={onSearchChange} />
                        <SearchButton searchClick={onSearchClick} />
                    </div>
                    <ErrorBoundry>
                        <CardList pokemons={filteredPokemons} />
                    </ErrorBoundry>
                    <AddLineupButton />
                </div>
                </article>
        </div>
    );           
}

export default App;