import React from 'react';

const SearchButton = ({searchClick}) => {
    return(
            <a className="pa3 link ba dim mb2 dib white pointer" onClick={searchClick}>Search</a>
    );
}

export default SearchButton;
