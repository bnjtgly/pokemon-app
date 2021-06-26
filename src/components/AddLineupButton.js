import React from 'react';

const AddLineupButton = ({addPokemonClick}) => {
    return(
            <a onClick={addPokemonClick} className="pa3 link ba dim mt2 dib white pointer" >Add to Lineup</a>
    );
}

export default AddLineupButton;
