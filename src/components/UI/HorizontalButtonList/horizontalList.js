import React from 'react';

import HorizontalButton from './horizontalButton';

const horizontalList = props => {
    const buttonsList = props.list.map(listItem =>
        <li key={listItem.id} className="horizontal-list__item">
            <HorizontalButton
                id={listItem.id}
                alt={listItem.alt}
                src={listItem.src}
                click={props.clickHandler} />
        </li>
    );

    return (
        <ul className="horizontal-list">
            {buttonsList}
        </ul>
    );
}

export default horizontalList;