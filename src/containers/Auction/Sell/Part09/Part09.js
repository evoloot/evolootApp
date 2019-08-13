import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

import oldManImage from '../../../../assets/images/oldMan.png';

class Part09 extends Component {

    state = {
        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);

        this.buttonExtras = document.querySelector('.button__green--popup');
        this.extras = document.getElementById('extras');
        this.disc = document.getElementById('disc');
        this.instructions = document.getElementById('instructions');
        this.box = document.getElementById('box');

        this.explanation = document.getElementById('explanation');
        this.description = document.getElementById('description');
        this.extrasDescription = document.getElementById('extrasDescription');

        this.explanation.style.display = 'none';
        this.description.style.display = 'none';
    }

    confirmHandler = () => {

        let allGood;

        [
            this.extras,
            this.disc,
            this.instructions,
            this.box,
        ].forEach(e => {
            document.getElementsByName(e.id).forEach(radio => {
                if (radio.checked) {

                    // Saves condition of item check, also means that the item was selected
                    //this.sellOptionStack[radio.name] = radio.value;

                    if (this.state.sellParams.find(el => el[`${radio.name}`]) === undefined)
                        this.state.sellParams.push({ [radio.name]: radio.value });
                    else {
                        this.state.sellParams.splice(this.state.sellParams.findIndex(el => el[`${radio.name}`]), 1);
                        this.state.sellParams.push({ [radio.name]: radio.value });
                    }

                    allGood = true;
                }
            });
        });

        if (allGood) {
            this.props.history.push(
                {
                    pathname: '/evolootApp/auction/sell/part10',
                    sellParams: this.state.sellParams
                }
            );
        } else {
            console.log('You cannot leave everything blank!');
        }

    }

    openDescription = () => {
        console.log('Open Description :D');
        this.description.style.display = 'block';
    }

    openExplanation = () => {
        console.log('open Explanation :D');
        this.explanation.style.display = 'block';
    }

    closeExplanation = () => {
        this.explanation.style.display = 'none';
    }

    closeDescription = () => {
        if (this.extrasDescription.value.trim() !== '')
            if (this.state.sellParams.find(el => el['extrasDescription']) === undefined)
                this.state.sellParams.push({ extrasDescription: this.extrasDescription.value });
            else {
                this.state.sellParams.splice(this.state.sellParams.findIndex(el => el['extrasDescription']), 1);
                this.state.sellParams.push({ extrasDescription: this.extrasDescription.value });
            }
        else
            if (this.state.sellParams.find(el => el['extrasDescription']) === undefined)
                this.state.sellParams.push({ extrasDescription: 'No description provided.' });
            else {
                this.state.sellParams.splice(this.state.sellParams.findIndex(el => el['extrasDescription']), 1);
                this.state.sellParams.push({ extrasDescription: 'No description provided.' });
            }


        console.log(this.extrasDescription.value);
        this.description.style.display = 'none';
    }

    render() {

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                    <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part08',
                            sellParams: this.state.sellParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />


                    <div className="row">
                        <figure className="dialog">
                            <img src={oldManImage} alt="Old Man" className="dialog__character" />
                            <div className="dialog__balloon">
                                <p className="paragraph"> Select the contents you're selling and its condition. </p>
                            </div>
                        </figure>
                    </div>


                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="row u-maximum-max-width">
                            <div className="form">
                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-2">
                                        <div className="dialog__header">
                                            <h2 className="header-primary--small">Contents</h2>
                                        </div>
                                    </div>
                                    <div className="col-1-of-2">
                                        <div className="dialog__header">
                                            <h2 className="header-primary--small">Condition</h2>
                                            <button className="button button__green--question" onClick={this.openExplanation}>
                                                <h2 className="button__green--question-mark header-secondary">?</h2>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-2">
                                        &nbsp;
                                    </div>
                                    <div className="col-1-of-2">
                                        <ul className="dialog__rate-title-list">

                                            <li className="dialog__rate-title-item">
                                                <label className="dialog__rate-label">
                                                    <p className="paragraph">Bad</p>
                                                </label>
                                            </li>
                                            <li className="dialog__rate-title-item">
                                                <label className="dialog__rate-label">
                                                    <p className="paragraph">Poor</p>
                                                </label>
                                            </li>
                                            <li className="dialog__rate-title-item">
                                                <label className="dialog__rate-label">
                                                    <p className="paragraph">Average</p>
                                                </label>
                                            </li>
                                            <li className="dialog__rate-title-item">
                                                <label className="dialog__rate-label">
                                                    <p className="paragraph">Good</p>
                                                </label>
                                            </li>
                                            <li className="dialog__rate-title-item">
                                                <label className="dialog__rate-label">
                                                    <p className="paragraph">Excellent</p>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-2">
                                        <div className="dialog__checkbox-item">
                                            <input type="checkbox" className="dialog__input" id="box"
                                                onChange={() => {
                                                    const boxRadios = document.getElementsByName('box');
                                                    this.box.checked ? boxRadios.forEach(radioButton => radioButton.disabled = false) : boxRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });
                                                }
                                                } />
                                            <label className="label dialog__checkbox-label" htmlFor="box">
                                                <span className="dialog__checkmark"></span>
                                                <p className="paragraph dialog__checkbox-name">Box</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-1-of-2">
                                        <ul className="dialog__checkbox-list">
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="bad" name="box" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="poor" name="box" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="average" name="box" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="good" name="box" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="excellent" name="box" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-2">
                                        <div className="dialog__checkbox-item">
                                            <input type="checkbox" className="dialog__input" id="disc"
                                                onChange={() => {
                                                    const discRadios = document.getElementsByName('disc');
                                                    this.disc.checked ? discRadios.forEach(radioButton => radioButton.disabled = false) : discRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });
                                                }
                                                } />
                                            <label className="label dialog__checkbox-label" htmlFor="disc">
                                                <span className="dialog__checkmark"></span>
                                                <p className="paragraph dialog__checkbox-name">Disc/Cart</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-1-of-2">
                                        <ul className="dialog__checkbox-list">
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="bad" name="disc" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="poor" name="disc" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="average" name="disc" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="good" name="disc" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="excellent" name="disc" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row u-very-small-margin-bottom">
                                    <div className="col-1-of-2">
                                        <div className="dialog__checkbox-item">
                                            <input type="checkbox" className="dialog__input" id="instructions"
                                                onChange={() => {
                                                    const instructionsRadios = document.getElementsByName('instructions');
                                                    this.instructions.checked ? instructionsRadios.forEach(radioButton => radioButton.disabled = false) : instructionsRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });
                                                }
                                                } />
                                            <label className="label dialog__checkbox-label" htmlFor="instructions">
                                                <span className="dialog__checkmark"></span>
                                                <p className="paragraph dialog__checkbox-name">Instructions</p>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-1-of-2">
                                        <ul className="dialog__checkbox-list">
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="bad" name="instructions" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="poor" name="instructions" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="average" name="instructions" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="good" name="instructions" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="excellent" name="instructions" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-1-of-2">
                                        <div className="dialog__checkbox-item">
                                            <input type="checkbox" className="dialog__input" id="extras"
                                                onChange={() => {
                                                    const extrasRadios = document.getElementsByName('extras');

                                                    if (this.extras.checked) {
                                                        this.state.sellParams.push({ extrasDescription: 'No description provided.' });
                                                        this.buttonExtras.disabled = false;
                                                        this.buttonExtras.addEventListener('click', this.openDescription);
                                                        extrasRadios.forEach(radioButton => radioButton.disabled = false);
                                                    } else {
                                                        this.buttonExtras.disabled = true;
                                                        extrasRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });
                                                    }
                                                }} />
                                            <label className="label dialog__checkbox-label" htmlFor="extras">
                                                <span className="dialog__checkmark"></span>
                                                <p className="paragraph dialog__checkbox-name">Extras</p>
                                            </label>
                                            <button className="button button__green--popup" disabled>
                                                <h2 className="button__green--popup-text header-secondary">set description</h2>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-1-of-2">
                                        <ul className="dialog__checkbox-list">
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="bad" name="extras" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="poor" name="extras" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="average" name="extras" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="good" name="extras" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                            <li className="dialog__checkbox--inline">
                                                <label className="dialog__checkbox-label">&nbsp;
                                                    <input type="radio" disabled="disabled" value="excellent" name="extras" className="dialog__input" />
                                                    <span className="dialog__checkmark--circle"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="row">
                                    <button className="button button__green--submit"
                                        onClick={this.confirmHandler}>
                                        <h2 className="button__green--submit-text header-secondary">Confirm</h2>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="footer" id="footer">
                        <DotSteps step={8} />
                    </div>

                </div>

                <div className="popup" id="description">
                    <div className="popup__content">

                        <div className="popup__text">
                            <p className="paragraph--secondary">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                        </div>
                        <div className="row">
                            <textarea className="popup__text-area" rows="15" cols="90" id="extrasDescription"></textarea>
                        </div>

                        <div className="row">
                            <button className="button button__orange" id="ok" onClick={this.closeDescription}>
                                <img src="./assets/images/cc_button_silver.png" alt="ok" />
                            </button>
                        </div>

                    </div>
                </div>

                <div className="popup" id="explanation">
                    <div className="popup__content">
                        <div className="popup__text">
                            <p className="paragraph--secondary">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati adipisci eveniet earum ab architecto exercitationem amet molestias quos dolore in maxime fugiat laborum, vel, tempora nostrum maiores, vitae assumenda laboriosam?
        </p>
                        </div>
                        <div className="row">
                            <button className="button button__orange" id="ok" onClick={this.closeExplanation}>
                                <img src="./assets/images/cc_button_silver.png" alt="ok" />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Part09;