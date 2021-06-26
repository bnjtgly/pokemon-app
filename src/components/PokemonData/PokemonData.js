import React from 'react';

const PokemonData = ({getPokemonInfo}) => {
    return (
        <div className='center tc my-pokemon-data pa3'>
            {
                // console.log(getPokemonInfo[0].name)
                getPokemonInfo.map((user, i) => {
                    return (
                        <div>
                            <article className="cf">
                                <div className="fl w-50">
                                    <h5 className="tl mt2 dark-gray pokemon-name">Name: <span className="near-white ttc">{getPokemonInfo[i].name}</span>
                                    </h5>
                                </div>
                                <div className="fl w-50">
                                    <h5 className="tl mt2 dark-gray nick-name">Nickname: <span className="near-white ttc">{getPokemonInfo[i].nick_name}</span></h5>
                                </div>
                            </article>
                            <article className="cf">
                                <div className="fl w-50">
                                    <h5 className="tl mt2 dark-gray favorite-color">Favorite Color: <span className="near-white ttc">{getPokemonInfo[i].favorite_color}</span></h5>
                                </div>
                                <div className="fl w-50">
                                    <h5 className="tl mt2 dark-gray favorite-food">Favorite Food: <span className="near-white ttc">{getPokemonInfo[i].favorite_food}</span></h5>
                                </div>
                            </article>
                            <article className="cf">
                                <div className="fl w-50">
                                    <h5 className="tl mt2 dark-gray move-set favorite-color">Moveset: <span className="near-white ttc">{getPokemonInfo[i].moveset}</span></h5>
                                </div>
                            </article>
                        </div>
                    );
                })
            }
            

        </div>
    );
}

export default PokemonData;

