import React from 'react';

const Card = ({name, abilities, id, types}) => {
    
    return (
        <div className='center ba b--black-10 w-80 shadow-5'>
            <img className="pokemon-img" alt='pokemons' src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} />
            <div>
                <p className="mid-gray pv0 mv0">#{id}</p>
                <h2 className="ttc">{name}</h2>
                {types.map((type) => <a className={`f6 mh1 br-pill ba ph3 pv2 mb2 dib mid-gray ttc background-color-${type}`}>{type}</a>)}
                <h5 className="mb0">Abilities</h5>
                {abilities.map((ability) => <p className="pt0 ph2 dib mid-gray ttc">{ability}</p>)}
            </div>
        </div>
    );
}


export default Card;

