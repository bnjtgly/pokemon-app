import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import SearchButton from '../components/SearchButton';
import AddLineupButton from '../components/AddLineupButton';
import ErrorBoundry from '../components/ErrorBoundry';
import CardLineupList from '../components/CardLineupList';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Navigation from '../components/Navigation/Navigation';
import PokemonData from '../components/PokemonData/PokemonData';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './App.css';

function App () {
    const [pokemons, setPokemons] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [mypokemons, setMypokemons] = useState([])
    const [mypokemonsInfo, setMypokemonsInfo] = useState([])
    const [route, setRoute] = useState('signin')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [isPokemonDataVisible, setIsPokemonDataVisible] = useState(true)


    useEffect(() => {
        let token = localStorage.getItem("token")
        if(token !== null){
            if (token.exp < new Date().getTime()/1000) {
                // console.log("EXPIRED");
                setRoute('signin')
                setIsSignedIn(false)
                
            }else{
                // console.log(" NOT EXPIRED");
                setRoute('home')
                setIsSignedIn(true)
            }
        }
    },[]);

    async function getPokemon(params) {
		try {
			const response = await fetch(`http://localhost:3000/api/v1/pokemons/${params}`)
    		const data = await response.json();
			setPokemons(data)
		} catch (err) {
			console.error('err', err);
		}
	}
    
    async function getMyPokemon() {
		try {
			const requestOptions = {
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem("token") }
			};
			const response = await fetch("http://localhost:3000/api/v1/user_pokemons", requestOptions)
    		const data = await response.json();
            if (data.error === 'Signature has expired'){
                localStorage.removeItem("token");
                setRoute('signin')
            }else{
                setMypokemons(data)
            }
            
			
		} catch (err) {
			// console.error('err', err);
            // console.log(err.message);
            // throw new TypeError(err.message);
            
		}
	}

    useEffect(() => {
            getMyPokemon();
    },[])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
        // console.log(event.target.value);
        // getPokemon(event.target.value);
    }

    const onSearchClick = (event) => {
        getPokemon(searchfield);
    }

    // const filteredPokemons = pokemons.filter(pokemon =>{
    //     return pokemon.name.toLowerCase();
    // });

    const onRouteChange = (route) => {
        if (route === 'signout') {
            localStorage.removeItem("token");
            setRoute('signin')
            setIsSignedIn(false)
        } else if (route === 'home') {
          setIsSignedIn(true)
          window.location.reload();
          getMyPokemon()
        }
        setRoute(route);
    }

    async function getMyPokemonInfo(params) {
        if(!isPokemonDataVisible){
            setIsPokemonDataVisible(!isPokemonDataVisible)
        }
        
		try {
			const requestOptions = {
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem("token") }
			};
			const response = await fetch(`http://localhost:3000/api/v1/user_pokemons/${params}`, requestOptions)
    		const data = await response.json();
			setMypokemonsInfo(data)
		} catch (err) {
			console.error('err', err);
		}
	}

    const onCardListClick = (event) => {
        const pokemon_id = event.target.id.replace("my-pokemon-", ""); 
        getMyPokemonInfo(pokemon_id);
    }

    async function addPokemon(params) {
		try {
			const requestOptions = {
                method: 'post',
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem("token") },
                body: JSON.stringify(params)
			};
			const response = await fetch(`http://localhost:3000/api/v1/user_pokemons`, requestOptions)
    		const data = await response.json();
            getMyPokemon();
		} catch (err) {
			console.error('err', err);
		}
	}

    const onAddPokemonClick = (event) => {
        const params = {
            user_pokemon: {
                info: {
                    pokedex_id: pokemons[0].id,
                    moveset: pokemons[0].moveset,
                    pokemon_attributes: {
                        name: pokemons[0].name
                    }
                }
            }
        }
        confirmAlert({
            title: 'Catch Pokemon',
            message: `Success!`,
            buttons: [
              {
                label: 'Confirm',
                onClick: () => addPokemon(params)
              }
            ]
        });
    }

    async function releasePokemon(params) {
		try {
			const requestOptions = {
                method: 'delete',
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem("token") }
			};
			const response = await fetch(`http://localhost:3000/api/v1/user_pokemons/${params}`, requestOptions)
    		setIsPokemonDataVisible(!isPokemonDataVisible)
            getMyPokemon();
		} catch (err) {
			console.error('err', err);
		}
	}

    const callMyPokemons = (event) => {
        const pokemon_id = event.target.id.replace("p-info-", ""); 
        confirmAlert({
            title: 'Release Pokemon',
            message: `Set free ${event.target.getAttribute("data-pokemonname")}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => releasePokemon(pokemon_id)
              },
              {
                label: 'No'
              }
            ]
        });
    }

    async function getUpdatePokemon(params, id) {
		try {
			const requestOptions = {
                method: 'put',
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem("token") },
                body: JSON.stringify(params)
			};
			const response = await fetch(`http://localhost:3000/api/v1/user_pokemons/${id}`, requestOptions)
    		const data = await response.json();
            getMyPokemonInfo(id)
            // getMyPokemon();
            // window.location.reload();
		} catch (err) {
			console.error('err', err);
		}
	}

    const updateMyPokemons = (event, params) => {
        const pokemon_id = event.target.id.replace("p-info-add-", "");
        // console.log(event, `ID ${pokemon_id}`) 
        getUpdatePokemon(params,pokemon_id)
    }

    // return !pokemons.length ?
    return(
        <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { route === 'home' ?
            <div className='tc'>
                <h1 className='f3 white mb4'>Welcome to Pokemon League</h1>
                    <article className="cf">
                    <div className="fl w-60 tc">
                        <h1 className='f4 white mb2'>Pokemon Lineup</h1>
                            <div className="pokemon-line-up ml4">
                                {
                                    // isSignedIn ? 
                                    <CardLineupList onCardListClick={onCardListClick} mypokemons={mypokemons} />
                                    // :
                                    // <div></div>
                                }
                                
                            </div>
                            
                            <div className="pokemon-data mv4 ml4">
                                <h1 className='f4 white mb2'>Pokemon Data</h1>
                                {/* <div className='center ba b--black-10 shadow-5 data'> */}
                                <div  className='center'>
                                    {
                                        isPokemonDataVisible ?
                                        <PokemonData getPokemonInfo={mypokemonsInfo} summonPokemons={callMyPokemons} updatePokemons={updateMyPokemons}/>
                                        : null
                                    }
                                    
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
                            <CardList pokemons={pokemons} />
                        </ErrorBoundry>
                        <AddLineupButton addPokemonClick={onAddPokemonClick}/>
                    </div>
                    </article>
            </div>
            : (
                route === 'signin'
                ? <Signin onRouteChange={onRouteChange}/>
                : <Register onRouteChange={onRouteChange}/>
               )
           }
        </div>
    );           
}

export default App;