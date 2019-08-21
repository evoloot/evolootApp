import React from 'react';

const popup = props => {
    let component;

    switch (props.type) {
        case ('message'):
            component = (
                <div className="popup" id="warning">
                    <div className="popup__content">

                        {props.children}
                        <div className="row">
                            <button onClick={props.click}>Ok</button>
                        </div>
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
                                <button>Yes</button>
                            </div>

                            <div className="col-1-of-2">
                                <button>No</button>
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