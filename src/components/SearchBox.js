import React from 'react';

const SearchBox = ({searchChange, searchClick}) => {
    return(
        
        <input className='pa3 ba b--black-10 shadow-5' type='search' placeholder='Search Pokemon' onChange={searchChange}/>
    );
}

export default SearchBox;
