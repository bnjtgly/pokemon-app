import React from 'react';

const CardLineup = ({name, pokedex_id}) => {
    return (
      // <div class="w-25 pa3 mr2 mt3 center ba b--black-10 shadow-5">
      <div className="ba b--black-10 shadow-5 w-25 pa3 mr2 mt3 pointer grow">
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokedex_id}.png`} className="br-100 h3 w3 dib" alt="Pokemon Lineup" />
            <div>
                <h4 className="ttc">{name}</h4>
            </div>
        </div>
    );
}


export default CardLineup;











