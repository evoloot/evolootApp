import React from 'react';

const popup = props => {
    let component;

    switch (props.type) {
        case ('message'):
            component = (
                <div className="popup">
                    <div className="popup__content">

                        <div className="popup__box">
                            {props.children}
                        </div>
                        <button className="button button__green--small" onClick={props.click}>Ok</button>

                    </div>
                </div>
            );
            break;
        case ('question'):
            component = (
                <div className="popup" id="arena">
                    <div className="popup__content">

                        <div className="popup__text" id="enter-question">
                            <p className="paragraph">Would you like to enter the Arena ?</p>
                        </div>

                        <div className="row">
                            <div className="col-1-of-2">
                                <button className="button button__green--small">Yes</button>
                            </div>

                            <div className="col-1-of-2">
                                <button className="button button__green--small">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
            break;
        default:
            component = null;
    }

    return (
        <React.Fragment>
            {component}
        </React.Fragment>
    );
}

export default popup;