import React from 'react';

import Item from './item';

const itemList = props => {
    let list;

    if (props.items.length > 0)
        list = (<ul className="item-list">
            {
                props.items.map(item =>
                    <li key={item.id} className="item-list__item">
                        <Item
                            id={item.id}
                            picture={item.picture}
                            alt={item.name}
                            name={item.name}
                            price={item.price}
                            firstButtonName={item.firstButtonName}
                            secondButtonName={item.secondButtonName}
                            firstButtonFunction={props.firstButtonFunction}
                            secondButtonFunction={props.secondButtonFunction}
                        />
                    </li>
                )
            }
        </ul>);
    else
        list = <h3 className="header-primary header-primary--small">-- Nothing here yet --</h3>

    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    );
};

export default itemList;