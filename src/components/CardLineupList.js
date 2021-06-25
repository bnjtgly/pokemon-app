import React from 'react';
import CardLineup from './CardLineup';

const CardLineupList = ({ mypokemons }) => {
    return(
        <div className="flex flex-wrap justify-between">
            {
                mypokemons.map((user, i) => {
                    return (
                        <CardLineup
                            key={i}
                            pokedex_id={mypokemons[i].info[0].pokedex_id}
                            name={mypokemons[i].name}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardLineupList;