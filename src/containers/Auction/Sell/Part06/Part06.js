import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import DotSteps from '../../../../components/Navigation/dotSteps';

// temporary
import airwolfImage from '../../../../assets/images/Airwolf.jpeg';
import bananaprinceImage from '../../../../assets/images/Banana_Prince.jpeg';
import dragonlairImage from '../../../../assets/images/Dragons_Lair.jpeg';
import eighteyesImage from '../../../../assets/images/8_Eyes.png';

class Part06 extends Component {

	state = {
		// temporary
		itemKeysArray: [
			{
				name: 'Airwolf',
				id: 'Airwolf',
				image: airwolfImage,
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			},
			{
				name: 'Banana Prince',
				id: 'Banana_Prince',
				image: bananaprinceImage,
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			},
			{
				name: 'Dragon\'s Lair',
				id: 'Dragons_Lair',
				image: dragonlairImage,
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			},
			{
				name: '8 Eyes',
				id: '8_Eyes',
				image: eighteyesImage,
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			}
		],

		result: null,

		sellParams: [

		]
	}

	componentDidMount() {
		if (this.props.location.sellParams !== undefined)
			this.state.sellParams.push(...this.props.location.sellParams);

		console.log(this.state.sellParams);

		this.searchField = document.getElementById('searchField');
		this.resultList = document.getElementById('searchList');
	}

	collectionImageClickHandler = el => {
		if (this.state.sellParams.find(el => el.sellCollectionImage) === undefined)
            this.state.sellParams.push({ sellCollectionImage: el });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellCollectionImage), 1);
            this.state.sellParams.push({ sellCollectionImage: el });
        }

		this.props.history.push({
				pathname: '/evolootApp/auction/sell/part07',
				sellParams: this.state.sellParams
			});
	}

	// good for getting an image from server
	importImage = path => {
		return import(path);
	}


	/**
     * Updates list of item images each time the serch field receives a key input.
     * @param {string} query The word being typed.
     */
	updateResult = event => {

		const resultArray = this.state.itemKeysArray.map((e, i) => {

			//  If typed word is different than -1, it matches.
			if (e.name.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) !== -1) {
				// Everytime 'if' condition passes, we add the element to the result list in the html page.
				// limit is 8 
				if (i < 8) {
					//return this.importImage(`../../../../assets/images/${e.image}`)
					//.then(image => {
					//console.log(image);

					return (
						<li key={e.id} className="item-box__search-item">
							<button id={e.id} className="button button__search-item" value={e.id}
								onClick={this.collectionImageClickHandler.bind(this, e)}>
								<img src={e.image} alt="Item Photo" />
							</button>
							<p className="paragraph">{e.name}</p>
						</li>
					);
					//})
					//.catch(err => console.log(err + 'image not found'));

					//this.getInformation(e, action, currentStateLevel);
				}
			}
		}).reduce((arr, el) => { // reduce gets each element of the array, parameters are the accumulator and current element 
			return arr.concat(el);
		}, []);

		this.setState({
			result: resultArray
		});
	}

	render() {
		return (
			<div className="arena" id="modal">
				<div className="header" id="header">

				<ButtonReturn
                        history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part05',
                            sellParams: this.state.sellParams
                        }} />

					<h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

					<NavMenu />

					<div className="row">
						<div className="search">
							<input onInput={this.updateResult} type="search" className="search__field search__field--big" placeholder="Search..." id="searchField" />
							<button className="button button__search">
								<i className="button__search-icon fas fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="arena__content-grid" id="content-box">

						<ul id="searchList" className="row u-maximum-max-width item-box__list">
							{this.state.result}
						</ul>

					</div>
					<div className="footer" id="footer">
						<DotSteps step={5}/>
					</div>

				</div>
			</div>
		);
	}
}

export default Part06;