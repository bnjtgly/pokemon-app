import React, { useState, useRef } from 'react';


const PokemonData = ({getPokemonInfo, summonPokemons, updatePokemons}) => {
    const [isDisable, setIsDisable] = useState(false)
    const [isEdit, setIsEdit] = useState('Edit')
    const [isSave, setIsSave] = useState(false)
    const [defaultInput, setDefaultInput] = useState("")
    // Pokemon info
    const [name, setName] = useState('')
    const [nickname, setNickname] = useState('')
    const [favcolor, setFavcolor] = useState('')
    const [favfood, setFavfood] = useState('')
    const [move, setMove] = useState('')

    const editPokeDataClick = (event) => {
        if(isEdit === 'Edit'){
            setIsEdit('Cancel')
            setIsDisable(!isDisable)
            setIsSave(!isSave)
        }else{
            setIsEdit('Edit')
            setIsDisable(!isDisable)
            setIsSave(!isSave)
        }
    }

    

    const onSaveClick = (event) => {
        const params = {
            user_pokemon: {
                info: {
                    nick_name: nickname,
                    favorite_color: favcolor,
                    favorite_food: favfood,
                    moveset: move
                } 
            }
        }
        updatePokemons(event,params)
    }

    const onNameChange = (event) => {
        setName(event.target.value)
    }
    const onNicknameChange = (event) => {
        setNickname(event.target.value)

    }
    const onFavcolorChange = (event) => {
        setFavcolor(event.target.value)
    }
    const onFavfoodChange = (event) => {
        setFavfood(event.target.value)
    }
    const onMoveChange = (event) => {
        setMove(event.target.value)
    }

    return (
        <div className='center tc my-pokemon-data pa3'>
            {
                getPokemonInfo.map((user, i) => {
                    return (

                        <div key={i}>
                            
                            <form id="pokemon_info_form">
                            
                            <article className="cf">
                                <div className="fl tl w-50">
                                    <h5 className="near-white">Name: {getPokemonInfo[i].name}</h5>
                                    {
                                        isDisable ?
                                        <input onChange={onNameChange} disabled={true} className="pokemon-info-input input-reset ba b--black-10 shadow-5 near-black pa2 mb2 db w-80" type="text" aria-describedby="name-desc" placeholder={getPokemonInfo[i].name}></input>
                                        : null
                                    }
                                    
                                </div>
                                <div className="fl tl w-50">
                                <h5 className="near-white">Nickname: {getPokemonInfo[i].nick_name}</h5>
                                    {
                                        isDisable ?
                                        <input onChange={onNicknameChange} className="pokemon-info-input input-reset ba b--black-10 shadow-5 near-black pa2 mb2 db w-80" type="text" aria-describedby="name-desc" placeholder={getPokemonInfo[i].nick_name}></input>
                                        : null
                                    }
                                </div>
                            </article>
                            <article className="cf">
                                <div className="fl tl w-50">
                                <h5 className="near-white">Favorite Color: {getPokemonInfo[i].favorite_color}</h5>
                                    {
                                        isDisable ?
                                        <input onChange={onFavcolorChange} className="pokemon-info-input input-reset ba b--black-10 shadow-5 near-black pa2 mb2 db w-80" type="text" aria-describedby="name-desc" placeholder={getPokemonInfo[i].favorite_color}></input>
                                        : null
                                    }
                                </div>
                                <div className="fl tl w-50">
                                <h5 className="near-white">Favorite Food: {getPokemonInfo[i].favorite_food}</h5>
                                    {
                                        isDisable ?
                                        <input onChange={onFavfoodChange} className="pokemon-info-input input-reset ba b--black-10 shadow-5 near-black pa2 mb2 db w-80" type="text" aria-describedby="name-desc" placeholder={getPokemonInfo[i].favorite_food}></input>
                                        : null
                                    }
                                </div>
                            </article>
                            <article className="cf">
                                <div className="fl tl w-50">
                                <h5 className="near-white">Moveset: {getPokemonInfo[i].moveset}</h5>
                                    {
                                        isDisable ?
                                        <input onChange={onMoveChange} className="pokemon-info-input input-reset ba b--black-10 shadow-5 near-black pa2 mb2 db w-80" type="text" aria-describedby="name-desc" placeholder={getPokemonInfo[i].moveset}></input>
                                        : null
                                    }
                                </div>
                            </article>
                            </form>
                            <div>
                                {
                                    isSave ?
                                    <a id={`p-info-add-${getPokemonInfo[i].id}`} onClick={onSaveClick} className="pa3 link ba dim mt2 mr3 dib b--green white pointer shadow-5">Save</a> 
                                    : null
                                }
                                {
                                    isSave ?
                                    <a id={`p-info-${getPokemonInfo[i].id}`} onClick={summonPokemons} data-pokemonname={getPokemonInfo[i].name} className="pa3 link ba dim mt2 mr3 dib b--red white pointer shadow-5">Set Free</a>
                                    : null
                                }
                                <a onClick={editPokeDataClick} className="pa3 link ba dim mt2 mr3 dib b--gray white pointer shadow-5">{isEdit}</a>
                                
                                
                                
                            </div>
                        </div>
                    );
                })
            }
            
            
        </div>
    );
}

export default PokemonData;