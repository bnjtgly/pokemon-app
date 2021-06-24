import React from 'react';
import Card from './Card';

const CardList = ({ pokemons }) => {
    return(
        <div>
            {
                pokemons.map((user, i) => {
                    return (
                        <Card
                            key={i}
                            id={pokemons[i].id}
                            name={pokemons[i].name}
                            abilities={pokemons[i].abilities}
                            types={pokemons[i].types}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardList;