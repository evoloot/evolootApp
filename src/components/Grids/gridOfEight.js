import React from 'react';

const gridOfEight = props => {


    /**
     * Distributes an array of a maximum of 8 elements into two lines and four columns
     * @param {*} arr 
     */
    const listOfEightDisplay = arr => {

        return (
            <React.Fragment>
                <div className="row u-maximum-max-width">
                    {arr.slice(0, 4)}
                </div>
                <div className="row u-maximum-max-width">
                    {arr.slice(4)}
                </div>
            </React.Fragment>
        )
    };

    /**
     * Receives an array of a maximum of 8 objects and returns an array of button elements
     * @param {*} arr array of objects, they need to have the following properties: 'id', 'iconClass' and 'innerText'.
     */
    const listOfEightButtonIcon = arr => arr.map(consoleE => {

        if (!props.images)
            return (
                <div key={consoleE.id} className="col-1-of-4">
                    <button className="button button__icon" id={consoleE.id}
                        onClick={props.click ? props.click : () => console.log('this does nothing yet')}>
                        <i className={`button__icon-icon--small ${consoleE.iconClass}`}></i>
                        <h2 className="button__icon-text--small header-secondary">{consoleE.innerText}</h2>
                    </button>
                </div>
            );
        else
            return (
                <div key={consoleE.id} className="col-1-of-4">
                    <button className="button button__icon" id={consoleE.id}
                    onClick={props.click}>
                        <img className="button__icon-icon--small" src={consoleE.src} alt={consoleE.alt} />
                    </button>
                </div>
            );
    });

    const contentBoxOptionsProductsList = listOfEightButtonIcon(props.objects);

    const contentBoxOptionsConsole = listOfEightDisplay(contentBoxOptionsProductsList);

    return (
        <React.Fragment>
            {contentBoxOptionsConsole}
        </React.Fragment>
    );
}

export default gridOfEight;