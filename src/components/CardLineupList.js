import React from 'react';
import CardLineup from './CardLineup';

const CardLineupList = ({ mypokemons, onCardListClick }) => {
    return(
        <div className="flex flex-wrap justify-between">
            {
                mypokemons.map((user, i) => {
                    return (
                        <CardLineup
                            key={i}
                            id={mypokemons[i].id}
                            pokedex_id={mypokemons[i].info[0].pokedex_id}
                            name={mypokemons[i].name}
                            onCardListClick={onCardListClick}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardLineupList;