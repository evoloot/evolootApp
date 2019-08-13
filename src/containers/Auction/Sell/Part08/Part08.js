import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

import oldManImage from '../../../../assets/images/oldMan.png';

class Part08 extends Component {

    state = {
        uploadArea: (
            <div className="drop-area__text">
                <p className="paragraph">Upload Picture</p>
            </div>
        ),
        images: null,
        existImage: false,

        sellParams: [

        ]
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);

        console.log(this.state.sellParams);
    }

    pictureInputHandler = event => {

        let imageCheck = false;
        const fileList = event.currentTarget.files;

        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].type.match(/^image\//)) {
                imageCheck = true;
            } else {
                imageCheck = false;
                console.log('Something is wrong with this file:' + fileList[i]);
            }
        }

        if (imageCheck) {
            this.setState({
                uploadArea: (
                    <img
                        src={URL.createObjectURL(fileList[0])}
                        id="picture"
                        className="drop-area__photo"
                        alt="Item"
                        style={{ visibility: 'visible' }} />
                ),
                images: fileList,
                existImage: true
            });
        }
    }

    confirmImageHanlder = () => {

        if (this.state.existImage) {
            if (this.state.sellParams.find(el => el.sellPictures) === undefined)
                this.state.sellParams.push({ sellPictures: this.state.images[0] });
            else {
                this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellPictures), 1);
                this.state.sellParams.push({ sellPictures: this.state.images[0] });
            }

            this.props.history.push({
                    pathname: '/evolootApp/auction/sell/part09',
                    sellParams: this.state.sellParams
                });
        } else {
            console.log('Select or take a photo of your item first!');
        }
    }

    render() {

        return (
            <div className="arena" id="modal">
                <div className="header" id="header">

                <ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part07',
                            sellParams: this.state.sellParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />


                    <div className="row">
                        <figure className="dialog">
                            <img src={oldManImage} alt="Old Man" className="dialog__character" />
                            <div className="dialog__balloon">
                                <p className="paragraph"> Now, take a photo and upload it! </p>
                            </div>
                        </figure>
                    </div>


                </div>

                <div className="row">
                    <div className="arena__content-grid" id="content-box">

                        <div className="row u-maximum-max-width">

                            <div className="drop-area">
                                <div className="row u-maximum-max-width">
                                    <div className="col-1-of-2">
                                        <div className="drop-area__form" > {/* was a form */}
                                            <input type="file" name="file" id="file" className="drop-area__input" accept="image/*" capture="capture"
                                                onChange={this.pictureInputHandler} />

                                            <label className="drop-area__label" htmlFor="file">
                                                {this.state.uploadArea}
                                            </label>

                                            <button className="button button__green--submit" id="confirm"
                                                onClick={this.confirmImageHanlder}>
                                                <h2 className="button__green--submit-text header-secondary">Confirm</h2>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-1-of-2">
                                        <div className="drop-area__explanation">
                                            <p className="paragraph--secondary">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero maiores tempora magni repudiandae, adipisci ad earum soluta. Dolorum unde delectus distinctio consequuntur veritatis accusamus minus sed deleniti vel fugit.
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero maiores tempora magni repudiandae.
                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="footer" id="footer">
                        <DotSteps step={7}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Part08;