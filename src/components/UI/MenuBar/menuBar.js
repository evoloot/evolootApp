import React from 'react';

import MenuButton from './menuButton';

const menuBar = props => {

    const elements = props.list.map(element => 
            <li className="menu-bar__item" key={element.name}>
                <MenuButton click={props.clickHandler} id={element.name}>{element.name}</MenuButton>
            </li>
        )

    return (
        <ul className="menu-bar">
            {elements}
        </ul>
    );
}

export default menuBar;