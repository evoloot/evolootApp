import { SceneManager } from '../managers/SceneManager';
import * as AuctionTemplates from '../templates/SceneAuctionTemplates';

/**
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli
 * @doc Scene for displaying and interact with the auction.
 * @class SceneAuction
 * @extends {Phaser.State}
 */
export class SceneAuction extends Phaser.State {
	constructor() {
		super();
	}

	preload() { }

	create() {

		// load json for buying

		// The key names will need to be received from server.
		this.itemKeysArray = [
			{
				name: 'Airwolf',
				id: 'Airwolf',
				image: 'Airwolf.jpeg',
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			},
			{
				name: 'Banana Prince',
				id: 'Banana_Prince',
				image: 'Banana_Prince.jpeg',
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			},
			{
				name: 'Dragon\'s Lair',
				id: 'Dragons_Lair',
				image: 'Dragons_Lair.jpeg',
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			},
			{
				name: '8 Eyes',
				id: '8_Eyes',
				image: '8_Eyes.png',
				format: 'cartridge',
				platform: 'SNES',
				location: 'US',
			}
		];

		this.stateStack = [];

		this.sellOptionStack = {};
		this.buyOptionStack = {};
		this.sceneModal;
		this.sceneReturn;

		this.createModalStates();
		this.nextStateLevel('start');

		this.setButtonFunctions('start');
	}

	update() {
		this.return();
	}

	/**
     * Updates list of item images each time the serch field receives a key input.
     * @param {string} query The word being typed.
     * @param {string} filter The filter option value.
     * @param {string} action The action(buying, selling...).
     */
	updateResult(query, action, currentStateLevel, filter = 'select') {

		const resultList = document.getElementById('searchList');
		if (resultList) resultList.innerHTML = '';

		this.itemKeysArray.map((e, i) => {

			//  If typed word is different than -1, it matches.
			if (e.name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
				// Everytime 'if' condition passes, we add the element to the result list in the html page.
				// limit is 8 
				if (i < 8) {
					if (resultList) resultList.innerHTML += `
                                            <li class="item-box__search-item">
                                                <button id="${e.id}" class="button button__search-item" value="${e.id}">
                                                    <img src="./assets/images/${e.image}" alt="Item Photo">
                                                </button>
                                                <p class="paragraph">${e.name}</p>
                                            </li>`;

					this.getInformation(e, action, currentStateLevel);
				}
			}
		});
	}

	/**
     * Turns all items(elements) current on display into an Array, then add a click Event Listener to each of them.
     * @param {Object} item The specific item object that is attached to the button function.
     * @param {string} action The action(buying, selling...).
     */
	getInformation(item, action, currentStateLevel) {
		const resultsArr = Array.from(document.querySelectorAll('.button__search-item'));

		if (resultsArr)
			resultsArr.forEach(button => {

				button.addEventListener('click', e => {
					e.preventDefault();

					if (action === 'sell') this.sellOptionStack.item = item;
					else if (action === 'buy') this.buyOptionStack.item = item;

					// Go to next screen
					this.nextStateLevel(`${action}_${parseInt(currentStateLevel) + 1}`);
				});
			});
	}

	/**
     * Determines what dialog shall be displayed.
     * @param {string} mapKey The mapkey is the key composed by the action and its current level, ex: sell_1.
     * - if left without a mapKey, the return will be a space.
     */
	setDialog(mapKey = 'null_00') {
		// change names of entries, 
		// is this the correct place?
		this.buyDialogs = [
			this.buyDialog = '<p class="paragraph"> What are you looking for today ? </p>'
		];

		this.sellDialogs = [
			this.sellDialog = '<p class="paragraph"> What are you looking to sell today ? </p>',
			null,
			this.sellDialogUsedState = '<p class="paragraph"> Is the item new or used ? </p>',
			this.sellDialogPictureUpload = '<p class="paragraph"> Now, take a photo or upload a picture! </p>',
			this.sellDialogContentCondition = '<p class="paragraph"> Select the contents you\'re selling and its condition. </p>',
			this.sellDialogAuctionSetup = '<p class="paragraph"> Setup your auction specifications. </p>',
			this.sellDialogEnd = '<p class="paragraph"> Congratulations, your item is in display! </p>'
		];

		const search = `
				<div class="row">
					<div class="search">
						<input type="search" class="search__field search__field--big" placeholder="Search..." id="searchField">
						<button class="button button__search" disabled="true">
							<i class="button__search-icon fas fa-search"></i>
						</button>
					</div>
				</div>`;
		const searchFilter = `
				<div class="row">
					<div class="search">
						<input type="search" class="search__field search__field" placeholder="Search..." id="searchField">
						<button class="button button__search" disabled="true">
							<i class="button__search-icon fas fa-search"></i>
						</button>
						<select class="search__select" id="searchFilter">
							<option value="-- Select --">-- Select --</option>
							<option value="sellRate">Seller Rate</option>
							<option value="condition">Condition</option>
							<option value="format">Format</option>
							<option value="platform">Platform</option>
							<option value="location">Location</option>
						</select>
					</div>
				</div>`;

		const action = mapKey.split('_')[0];
		const currentStateLevel = mapKey.split('_')[1];
		let dialog;

		switch (action) {
			case 'search':
				if (currentStateLevel === '0') return search;
				else if (currentStateLevel === '1') return searchFilter;
				break;
			case 'sell':
				dialog = `${this.sellDialogs[currentStateLevel]}`;
				break;
			case 'buy':
				dialog = `${this.buyDialogs[currentStateLevel]}`;
				break;
			default:
				return '<div class="row">&nbsp;</div>';
		}

		return `
			<div class="row">
				<figure class="dialog">
					<img src="assets/images/oldMan.png" alt="Old Man" class="dialog__character">
					<div class="dialog__balloon">
						${dialog}
					</div>
				</figure>
			</div>`;
	}

	setDynamicHeaderBox() {

	}

	/**
     * Sets the functionality of the current 'content' components of the current modal state and level(if present).
     * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
     */
	setButtonFunctions(mapKey = 'start') {
		const action = mapKey.split('_')[0];
		const currentStateLevel = mapKey.split('_')[1];

		switch (action) {
			case 'sell':
				this.sell(action, currentStateLevel);
				break;
			case 'buy':
				this.buy(action, currentStateLevel);
				break;
			case 'start':
				this.entrance();
		}
	}

	/**
	 * Functionality collection of the Start state.
	 * - The buttons will direct the user to a more specific state.
	 */
	entrance() {
		document.getElementById('buy').addEventListener('click', e => {
			console.log('buy clicked');
			this.nextStateLevel('buy_0');
		});

		document.getElementById('sell').addEventListener('click', e => {
			e.preventDefault();
			console.log('sell clicked');
			this.nextStateLevel('sell_0');
		});

		document.getElementById('featured').addEventListener('click', e => {
			console.log('featured clicked');
		});

		document.getElementById('showdown').addEventListener('click', e => {
			console.log('showdown clicked');
		});
	}

	/**
	 * Functionality collection of the Buy state.
	 * - Each level has a specific set of functions given to its elements accordingly.
	 * @param {String} action current action.
	 * @param {String} currentStateLevel current level of the action.
	 */
	buy(action, currentStateLevel) {
		const videoGames = document.getElementById('videoGames');
		const tradingCards = document.getElementById('tradingCards');
		const comics = document.getElementById('comics');
		const boardGames = document.getElementById('boardGames');

		const consoleElement = document.getElementById('consoles');
		const handheldElement = document.getElementById('handheld');

		const buttonIcons = document.getElementsByClassName('button__icon');
		const resultList = document.getElementById('searchList');

		if (currentStateLevel === '0') {

			if (videoGames) videoGames.addEventListener('click', e => {
				e.preventDefault();
				console.log('videoGames clicked');
				// save buy option
				this.buyOptionStack.category = videoGames.id;
				this.nextStateLevel('buy_1');
			});

			/////////////////////////////////////

			if (tradingCards) tradingCards.addEventListener('click', e => {
				e.preventDefault();
				console.log('tradingCards clicked');
			});

			if (comics) comics.addEventListener('click', e => {
				e.preventDefault();
				console.log('comics clicked');
			});

			if (boardGames) boardGames.addEventListener('click', e => {
				e.preventDefault();
				console.log('boardGames clicked');
			});
		} else if (currentStateLevel === '1') {

			if (buttonIcons)
				Array.from(buttonIcons).forEach(element => {
					element.addEventListener('click', e => {
						e.preventDefault();

						this.buyOptionStack.company = element.id;

						if (this.buyOptionStack.company === 'nintendo') {
							this.nextStateLevel('buy_2');
						}
						// others do not have handhelds, so they are automatically set to 'consoles', skiping part 2 
						// some adjustments at the level stack are required
						else if (this.buyOptionStack.company === 'atari') {
							this.buyOptionStack.product = 'consoles';
							this.customEarlyContentState = this.pageState.get('buy_3').content3;
							this.nextStateLevel('buy_3', this.pageState.get('buy_3').content3);
						} else if (this.buyOptionStack.company === 'microsoft') {
							this.buyOptionStack.product = 'consoles';
							this.customEarlyContentState = this.pageState.get('buy_3').content4;
							this.nextStateLevel('buy_3', this.pageState.get('buy_3').content4);
						} else if (this.buyOptionStack.company === 'sega') {
							this.buyOptionStack.product = 'consoles';
							this.customEarlyContentState = this.pageState.get('buy_3').content5;
							this.nextStateLevel('buy_3', this.pageState.get('buy_3').content5);
						} else if (this.buyOptionStack.company === 'sony') {
							this.buyOptionStack.product = 'consoles';
							this.customEarlyContentState = this.pageState.get('buy_3').content6;
							this.nextStateLevel('buy_3', this.pageState.get('buy_3').content6);
						}
					});
				});
		} else if (currentStateLevel === '2') {

			//this.customEarlyContentState = null;

			// In this case, each button will lead to different options, so it was
			// needed to create a 'content2' option;
			const eventListenerIncrement = element => {
				element.addEventListener('click', e => {
					e.preventDefault();

					this.buyOptionStack.product = element.id;

					if (element.id === 'consoles')
						this.nextStateLevel('buy_3');
					else {
						this.nextStateLevel('buy_3', this.pageState.get('buy_3').content2);
					}
				});

			}

			// adding "same" functionality to both buttons;
			if (consoleElement)
				eventListenerIncrement(consoleElement);

			if (handheldElement)
				eventListenerIncrement(handheldElement);


		} else if (currentStateLevel === '3') {

			if (buttonIcons)
				Array.from(buttonIcons).forEach(element => {
					element.addEventListener('click', e => {
						e.preventDefault();

						this.buyOptionStack.productType = element.id;

						this.nextStateLevel('buy_4');
					});
				});
		} else if (currentStateLevel === '4') {
			const loader = new Phaser.Loader(this.game);
			let stringPath;
			let postFix;

			const listItemElementCreator = (stringPath, postFix, itemType) => {

				if (resultList)
					resultList.innerHTML += `<li class="item-box__search-item">
												<button class="button button__icon" id="${postFix}" value="${postFix}">
													<img class="button__icon-icon--small" src="${stringPath + postFix}" alt="Item Photo">
													<h2 class="button__icon-text--small header-secondary">${itemType}</h2>
												</button>
											</li>`;
			} 

			if (this.buyOptionStack.company === 'nintendo')
				stringPath = `assets/images/isometrics/${this.buyOptionStack.company}/${this.buyOptionStack.product}`;
			else
				stringPath = `assets/images/isometrics/${this.buyOptionStack.company}`;

			[
				'games',
				'accessories',
				'hardware',
				//bundle
			].forEach(itemType => {
				if (itemType === 'games') {
					const cartridge = `${this.buyOptionStack.productType}_Cartridge.png`;
					const disc = `${this.buyOptionStack.productType}_Disc+Case.png`;

					loader.image(`${cartridge}`, `${stringPath}/${itemType}/${cartridge}`);
					loader.image(`${disc}`, `${stringPath}/${itemType}/${disc}`);
		
					loader.onLoadComplete.addOnce(() => {
						if (this.game.cache.checkImageKey(`${cartridge}`))
							postFix = `/${itemType}/${cartridge}`;
						else
							postFix = `/${itemType}/${disc}`;

						listItemElementCreator(stringPath, postFix, itemType);
					});
				} else if (itemType === 'accessories') {
					const controller = `${this.buyOptionStack.productType}_Controller.png`;

					loader.image(`${controller}`, `${stringPath}/${itemType}/${controller}`);
			
					loader.onLoadComplete.addOnce(() => {
						if (this.game.cache.checkImageKey(`${controller}`)) {
							postFix = `/${itemType}/${controller}`;
							listItemElementCreator(stringPath, postFix, itemType);
						}
					});
				} else {
					const consoleI = `${this.buyOptionStack.productType}_Console.png`;

					loader.image(`${consoleI}`, `${stringPath}/${itemType}/${consoleI}`);

					loader.onLoadComplete.addOnce(() => {
						if (this.game.cache.checkImageKey(`${consoleI}`)) {
							postFix = `/${itemType}/${consoleI}`;
							listItemElementCreator(stringPath, postFix, itemType);
						}
					});
				}
			});

			loader.start();
		}
	}

	/**
	 * Functionality collection of the Sell state.
	 * - Each level has a specific set of functions given to its elements accordingly.
	 * @param {String} action current action.
	 * @param {String} currentStateLevel current level of the action.
	 */
	sell(action, currentStateLevel) {
		if (currentStateLevel === '0') {
			const videoGames = document.getElementById('videoGames');
			const tradingCards = document.getElementById('tradingCards');
			const comics = document.getElementById('comics');
			const boardGames = document.getElementById('boardGames');

			if (videoGames) videoGames.addEventListener('click', e => {
				e.preventDefault();
				console.log('videoGames clicked');
				// save sell option
				this.sellOptionStack.category = 'videoGames';
				this.nextStateLevel('sell_1');
			});

			if (tradingCards) tradingCards.addEventListener('click', e => {
				e.preventDefault();
				console.log('tradingCards clicked');
			});

			if (comics) comics.addEventListener('click', e => {
				e.preventDefault();
				console.log('comics clicked');
			});

			if (boardGames) boardGames.addEventListener('click', e => {
				e.preventDefault();
				console.log('boardGames clicked');
			});

			// Others

		}
		///////////////////////////////////////////////////
		else if (currentStateLevel === '1') {
			this.preview(currentStateLevel);
			// new
			if (document.getElementById('nintendo'))
				document.getElementById('nintendo').addEventListener('click', e => {
					e.preventDefault();

					// save sell option
					this.sellOptionStack.company = 'nintendo';

					this.nextStateLevel('sell_2');
				});
		} else if (currentStateLevel === '2') {
			this.preview(currentStateLevel);
			// new
			if (document.getElementById('consoles'))
				document.getElementById('consoles').addEventListener('click', e => {
					e.preventDefault();

					// save sell option
					this.sellOptionStack.console = 'consoles';

					this.nextStateLevel('sell_3');
				});
		}
		else if (currentStateLevel === '3') {
			this.preview(currentStateLevel);

			// new
			if (document.getElementById('nes'))
				document.getElementById('nes').addEventListener('click', e => {
					e.preventDefault();

					// save sell option
					this.sellOptionStack.product = 'nes';

					this.nextStateLevel('sell_4');
				});
		}
		else if (currentStateLevel === '4') {
			this.preview(currentStateLevel);
			// new
			if (document.getElementById('games'))
				document.getElementById('games').addEventListener('click', e => {
					e.preventDefault();

					// save sell option
					this.sellOptionStack.consoleItem = 'games';

					this.nextStateLevel('sell_5');
				});

			/////////////////////////////////////////////////////////////////////
		} else if (currentStateLevel === '5') {
			this.preview(currentStateLevel);
			const text = document.getElementById('searchField');

			if (text)
				text.addEventListener('input', e => {
					e.preventDefault();
					this.updateResult(text.value, action, currentStateLevel);
				});
		}

		else if (currentStateLevel === '6') {
			this.preview(currentStateLevel);
			// new
			if (document.getElementById('new'))
				document.getElementById('new').addEventListener('click', e => {
					e.preventDefault();

					// save sell option
					this.sellOptionStack.condition = 'new';

					this.nextStateLevel('sell_7');
				});

			// used
			if (document.getElementById('used'))
				document.getElementById('used').addEventListener('click', e => {
					e.preventDefault();

					// save sell option
					this.sellOptionStack.condition = 'used';

					this.nextStateLevel('sell_7');
				});
		} else if (currentStateLevel === '7') {
			this.preview(currentStateLevel);
			let fileList;

			const uploadButton = document.querySelector('.drop-area__label');
			const pictureShow = document.getElementById('picture');

			if (uploadButton)
				uploadButton.addEventListener('click', event => {
					event.preventDefault();

					const markup = `
						<div class="popup" id="popup">
							<div class="popup__content">

							<div class="row">
								<div class="col-1-of-2">
									<button class="button button__icon">
										<input type="file" name="file" id="file" class="drop-area__input" accept="image/*" capture="capture">
																		
										<label class="button" for="file">
											<i class="button__icon-icon--big button__icon-icon--big-2 fas fa-file-image"></i>
											<h2 class="button__icon-text--small header-secondary">Pick from gallery</h2>
										</label>
									</button>
								</div>
								
								<div class="col-1-of-2">
									<button class="button button__icon" id="takePicture">
										<i class="button__icon-icon--big button__icon-icon--big-2 fas fa-camera-retro"></i>
										<h2 class="button__icon-text--small header-secondary">Take a Picture</h2>
									</button>
								</div>
							</div>
							
							<button class="button button__green--submit" id="cancel">
								<h2 class="button__green--submit-text header-secondary">Cancel</h2>
							</button>

							</div>
						</div>`;

					this.insertPopup(markup);

					const popup = document.getElementById('popup');
					const takePicture = document.getElementById('takePicture');
					const choosePicture = document.getElementById('file');
					const cancel = document.getElementById('cancel');

					// activates camera to take picture
					if (takePicture)
						takePicture.addEventListener('click', event => {
							event.preventDefault();

							const cam = navigator.camera.getPicture(picture => {
								pictureShow.src = picture;

								pictureShow.style.visibility = 'visible';

								// closes popup
								if (popup) popup.parentNode.removeChild(popup);
							}, err => {
								console.log(err);
							});
						});

					//choose from gallery:
					if (choosePicture)
						choosePicture.addEventListener('change', e => {
							e.preventDefault();

							fileList = e.target.files;

							// exclude text from 'picture'
							const pictureArea = document.querySelector('.drop-area__text');

							// adds file picture 
							for (let i = 0; i < fileList.length; i++) {
								if (fileList[i].type.match(/^image\//)) {
									//let file = fileList[i];
									if (pictureArea)
										pictureArea.parentNode.removeChild(pictureArea);
								} else {
									console.log('Something is wrong with this file:' + fileList[i]);
								}
							}

							if (fileList && pictureShow) {
								// show picture as background of the button.
								pictureShow.src = URL.createObjectURL(fileList[0]);

								pictureShow.style.visibility = 'visible';

								if (popup) popup.parentNode.removeChild(popup);
							}
						});

					// close popup
					cancel.addEventListener('click', event => {
						event.preventDefault();

						if (popup) popup.parentNode.removeChild(popup);
					});
				});

			// confirm saves and  go to next screen if an image(s) exist
			document.getElementById('confirm').addEventListener('click', e => {
				if (pictureShow && (pictureShow.src.trim() !== '')) {
					this.sellOptionStack.photo = pictureShow.src;

					this.nextStateLevel('sell_8');
				} else {
					console.log('Select or take a photo of your item first!');
				}
			});

		} else if (currentStateLevel === '8') {
			this.preview(currentStateLevel);
			// Probably will have changes
			const markup = `
					<div class="popup" id="id03">
						<div class="popup__content">

							<div class="row">
								<button class="button button__orange" id="ok">
									<img src="./assets/images/cc_button_silver.png" alt="ok">
								</button>
							</div>

						</div>
					</div>`;

			const buttonExtras = document.querySelector('.button__green--popup');
			const extras = document.getElementById('extras');
			const disc = document.getElementById('disc');
			const instructions = document.getElementById('instructions');
			const box = document.getElementById('box');

			disc.onchange = () => {
				const discRadios = document.getElementsByName('disc');
				disc.checked ? discRadios.forEach(radioButton => radioButton.disabled = false) : discRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });
			};

			instructions.onchange = () => {
				const instructionsRadios = document.getElementsByName('instructions');
				instructions.checked ? instructionsRadios.forEach(radioButton => radioButton.disabled = false) : instructionsRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });

			};

			box.onchange = () => {
				const boxRadios = document.getElementsByName('box');
				box.checked ? boxRadios.forEach(radioButton => radioButton.disabled = false) : boxRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });

			};

			extras.onchange = () => {
				const extrasRadios = document.getElementsByName('extras');

				if (extras.checked) {
					this.sellOptionStack.extrasDescription = 'No description provided.';
					buttonExtras.disabled = false;
					extrasRadios.forEach(radioButton => radioButton.disabled = false);
				} else {
					buttonExtras.disabled = true;
					extrasRadios.forEach(radioButton => { radioButton.disabled = true; radioButton.checked = false; });
				}
			};

			// Contents Help
			document.querySelector('.button__green--question').addEventListener('click', e => {
				// Shows modal with explanation
				const paragraph = `
					<div class="popup__text">
						<p class="paragraph--secondary">                             
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati adipisci eveniet earum ab architecto exercitationem amet molestias quos dolore in maxime fugiat laborum, vel, tempora nostrum maiores, vitae assumenda laboriosam?
						</p>
					</div>`;

				// Shows modal
				this.insertPopup(markup);

				const popup = document.getElementById('id03');
				const popupText = document.querySelector('.popup__content');

				// insert text
				popupText.insertAdjacentHTML('afterbegin', paragraph);

				// 'ok' button to close
				document.getElementById('ok').addEventListener('click', e => {
					e.preventDefault();

					if (popup) popup.parentNode.removeChild(popup);
				});
			});

			buttonExtras.addEventListener('click', e => {
				e.preventDefault();
				// Shows modal with explanation, a textfield and 
				const textArea = `
						<div class="popup__text">
							<p class="paragraph--secondary">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</p>
						</div>
						<div class="row">
							<textarea class="popup__text-area" rows="15" cols="90" id="extrasDescription"></textarea> 
						</div>`;

				// Show modal
				this.insertPopup(markup);

				const popup = document.getElementById('id03');
				const popupText = document.querySelector('.popup__content');

				// insert text are after text
				popupText.insertAdjacentHTML('afterbegin', textArea);
				let extrasDescription = document.getElementById('extrasDescription');

				if (this.sellOptionStack.extrasDescription) extrasDescription.value = this.sellOptionStack.extrasDescription;

				// ok button to confirm/close
				document.getElementById('ok').addEventListener('click', e => {
					e.preventDefault();

					if (document.getElementById('extras').checked) {
						if (extrasDescription.value.trim() === '') {
							this.sellOptionStack.extrasDescription = 'No description provided.';
						} else {
							this.sellOptionStack.extrasDescription = extrasDescription.value.trim();
						}
					} else {
						this.sellOptionStack.extrasDescription = null;
					}

					if (popup) popup.parentNode.removeChild(popup);
				});
			});

			document.querySelector('.button__green--submit').addEventListener('click', e => {
				e.preventDefault();
				let allGood = false;

				[
					extras,
					disc,
					instructions,
					box,
				].forEach(e => {
					document.getElementsByName(e.id).forEach(radio => {
						if (radio.checked) {

							// Saves condition of item check, also means that the item was selected
							this.sellOptionStack[radio.name] = radio.value;
							allGood = true;
						}
					});
				});

				if (allGood) {
					// Saves information
					console.log(this.sellOptionStack);

					// Goes to next screen
					this.nextStateLevel('sell_9');
				} else {
					console.log('You cannot leave everything blank!');
				}

			});

		} else if (currentStateLevel === '9') {
			const auctionStyleRadios = document.getElementsByName('auctionStyle');
			const auctionLengthRadios = document.getElementsByName('auctionLength');
			const minimumBidPriceRadios = document.getElementsByName('auctionMinimumPrice');
			const startingPrice = document.getElementById('auctionStartingPrice');
			const reserveInteger = document.getElementById('auctionReserveInteger');
			const reserveCent = document.getElementById('auctionReserveCent');
			// shipping
			const returnPolicy = document.getElementById('auctionReturnPolicy');
			const confirm = document.querySelector('.button__green--submit');

			this.preview(currentStateLevel);
			console.log('Auction Setup');
			// In blank for now, more information required for validation/verification of information.
			if (confirm) confirm.addEventListener('click', e => {
				e.preventDefault();
				let valid = true;

				if (auctionStyleRadios) {
					const auctionStyle = Array.from(auctionStyleRadios).find(radio => radio.checked === true);
					this.sellOptionStack[auctionStyle.name] = auctionStyle.value;
				}

				if (auctionLengthRadios) {
					const auctionLength = Array.from(auctionLengthRadios).find(radio => radio.checked === true);
					this.sellOptionStack[auctionLength.name] = auctionLength.value;
				}

				if (minimumBidPriceRadios) {
					const minimumBidPrice = Array.from(minimumBidPriceRadios).find(radio => radio.checked === true);
					this.sellOptionStack[minimumBidPrice.name] = minimumBidPrice.value;
				}

				if (startingPrice)
					startingPrice.value && startingPrice.value >= 1 ? this.sellOptionStack[startingPrice.id] = `${Math.floor(startingPrice.value)}` : valid = false;

				if (reserveInteger && reserveCent) {
					let dollar = reserveInteger.value && reserveInteger.value >= 1 ? Math.floor(reserveInteger.value) : valid = false;
					let cent = reserveCent.value && reserveCent.value >= 0 ? Math.round(reserveCent.value) : valid = false;

					if (valid) this.sellOptionStack['auctionReserveValue'] = `${dollar}.${cent}`;
				}
				if (returnPolicy && returnPolicy.value !== '-- Select --')
					this.sellOptionStack[returnPolicy.id] = returnPolicy.value;
				else
					valid = false;

				if (valid) {
					// Send Data to server
					console.log(this.sellOptionStack);

					this.nextStateLevel('sell_10');
				}
			});


		} else if (currentStateLevel === '10') {
			this.preview(currentStateLevel);
			console.log('The End');

			// sell again?
			document.getElementById('sellAgain').addEventListener('click', e => {
				e.preventDefault();

				this.stateStack.splice(1);

				this.sellOptionStack = {};

				this.nextStateLevel('sell_0');
			});

			// back to map
			document.getElementById('map').addEventListener('click', e => {
				e.preventDefault();

				this.reset();

				SceneManager.goto('SceneMap');
			});

			// listing ?
		}
	}

	/**
	 * Sets the specific navigation, header, dialog and content box based on the 'mapKey' to show on the screen.
	 * - Each page is that is not heavy game based will usually be composed by a html modal on top. 
	 * - calls insertNewModalContent() function.
	 * - calls setsetButtonFunctions() function.
	 * - inserts current state to the stateStack Array, if not yet added.
	 * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
	 * @param {string} content An optional html string content replacement, defaults to the original.
	 */
	nextStateLevel(mapKey, content = this.pageState.get(mapKey).content) {


		const modalTemplate = `
            <div class="arena" id="modal">
                <div class="header" id="header">
                    ${this.pageState.get(mapKey).header}
                    ${this.pageState.get(mapKey).dialog}
                </div>

				<div class="row">
					<div class="arena__content-grid" id="content-box">
						${content}
					</div>
				
					<div class="footer" id="footer">
						${this.pageState.get(mapKey).footer}
					</div>
				</div>
            </div>`;

		this.insertNewModalContent(modalTemplate);
		this.setButtonFunctions(mapKey);

		if (!this.stateStack.find(e => e === mapKey)) this.stateStack.push(mapKey);

	}

	/**
	 * Creates a Map to keep the modal states this scene will have.
	 * - Each page state has a key associted to the action and its level(if present).
	 * - Each modal object is usually composed by the main elements of navigation, header, content and footer.
	 * - The attributes are html strings.
	 */
	createModalStates() {
		this.pageState = new Map();

		this.pageState.set('start', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog(),
			content: AuctionTemplates.contentBox,
			footer: '&nbsp'
		});

		/*------------ SELL -----------*/
		this.pageState.set('sell_0', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('sell_0'),
			content: AuctionTemplates.contentBoxOptions,
			footer: '&nbsp'
		});

		this.pageState.set('sell_1', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('search_0'),
			content: AuctionTemplates.contentBoxOptionsCompany,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_2', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('search_0'),
			content: AuctionTemplates.contentBoxOptionsConsole,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_3', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('search_0'),
			content: AuctionTemplates.contentBoxOptionsProduct,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_4', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('search_0'),
			content: AuctionTemplates.contentBoxOptionsItems,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_5', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('search_0'),
			content: AuctionTemplates.contentBoxSearch,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_6', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('sell_2'),
			content: AuctionTemplates.contentBoxSellUsedState,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_7', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('sell_3'),
			content: AuctionTemplates.contentBoxSellPicureDrop,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_8', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('sell_4'),
			content: AuctionTemplates.contentBoxSellContentsCondition,
			footer: AuctionTemplates.stepsFooter
		});

		this.pageState.set('sell_9', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('sell_5'),
			content: AuctionTemplates.contentBoxSellAuctionSetup,
			footer: AuctionTemplates.stepsFooter
		});
		this.pageState.set('sell_10', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('sell_6'),
			content: AuctionTemplates.contentBoxSellEnd,
			footer: AuctionTemplates.stepsFooter
		});

		/*------------ BUY -----------*/
		this.pageState.set('buy_0', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('buy_0'),
			content: AuctionTemplates.contentBoxOptions,
			footer: '&nbsp'
		});

		this.pageState.set('buy_1', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog(),
			content: AuctionTemplates.contentBoxOptionsCompany,
			footer: '&nbsp'
		});

		this.pageState.set('buy_2', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog(),
			content: AuctionTemplates.contentBoxOptionsConsole,
			footer: '&nbsp'
		});

		this.pageState.set('buy_3', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog(),
			content: AuctionTemplates.buyContentBoxOptionsProductConsoleNintendo,
			content2: AuctionTemplates.buyContentBoxOptionsProductHandheldNintendo,
			content3: AuctionTemplates.buyContentBoxOptionsProductConsoleAtari,
			content4: AuctionTemplates.buyContentBoxOptionsProductConsoleMicrosoft,
			content5: AuctionTemplates.buyContentBoxOptionsProductConsoleSega,
			content6: AuctionTemplates.buyContentBoxOptionsProductConsoleSony,
			footer: '&nbsp'
		});

		this.pageState.set('buy_4', {
			header: AuctionTemplates.headerBox,
			dialog: this.setDialog('search_1'),
			content: AuctionTemplates.contentBoxSearch,
			footer: '&nbsp'
		});


		/*
			this.pageState.set('buy_2', {
				header: AuctionTemplates.headerBox,
				dialog: this.setDialog('buy_2'),
				content: AuctionTemplates.contentBoxBiding,
				footer: '&nbsp'
			});
			*/
	}

	/**
	 * Displays a new popup modal to the top a Scene.
	 * @param {string} popupTemplate : A html string.
	 */
	insertPopup(popupTemplate) {
		const body = document.getElementById('root');
		body.insertAdjacentHTML('afterbegin', popupTemplate);
	}

	/**
	 * Displays a new modal to the top a Scene.
	 * - This removes and replaces any current modal displaying.
	 * - Modal is inserted inside the 'root' container.
	 * @param {string} modalTemplate : A html string.
	 */
	insertNewModalContent(modalTemplate) {
		if (this.sceneModal)
			this.sceneModal.parentNode.removeChild(this.sceneModal);

		const body = document.getElementById('root');
		body.insertAdjacentHTML('afterbegin', modalTemplate);
		this.sceneModal = document.getElementById('modal');
		this.sceneReturn = document.getElementById('return');
	}

	// Deprecated
	processSceneExit() {
		//Return to previous Scene
		SceneManager.pop();
	}

	/**
	 * Sets a preview window of how the item will look like when at the auction.
	 * @param {string} step current auction setup step.
	 */
	preview(step) {
		const steps = document.getElementsByClassName('footer__step');
		const preview = document.getElementById('preview');

		const stepCount = parseInt(step) - 1;
		// if first, set to active
		if (stepCount === 0)
			steps[stepCount].classList.add('footer__step--active');
		else if (stepCount === 9) { // if last, change to done
			Array.from(steps).map(e => {
				if (e) e.parentNode.removeChild(e);
			});

			preview.insertAdjacentHTML('beforebegin', '<p class="paragraph footer__step-done">Done!</p>');
		} else {
			// else, mark current as active and all previous as 'done'
			steps[stepCount].classList.add('footer__step--active');
			for (let i = 0; i < stepCount; ++i)
				steps[i].classList.add('footer__step--finish');
		}

		preview.addEventListener('click', e => {
			e.preventDefault();

			this.insertPopup(`
                <div class="arena" id="demo">
                    <div class="header" id="header">
                        ${this.headerTitle}
                    </div>
					<div class="row">
						<div class="arena__content-grid" id="content-box">
							${AuctionTemplates.contentBoxBiding}
						</div>
						<div class="footer" id="footer">
							&nbsp;
						</div>
					<div class="row">
				</div>`);

			const itemPhoto = document.getElementById('itemPhoto');
			const buttonSlot = document.getElementById('buttonSlot');
			const demo = document.getElementById('demo');
			let replace = document.getElementById('bid');
			demo.style.zIndex = '2500';

			if (this.sellOptionStack.photo) {
				itemPhoto.src = this.sellOptionStack.photo;
				itemPhoto.alt = this.sellOptionStack.item.name;
			}

			if (replace) replace.parentNode.removeChild(replace);

			buttonSlot.insertAdjacentHTML('afterbegin', `
				<button class="button button__green--submit" id="ok">
					<h2 class="button__green--submit-text header-secondary">Ok</h2>
                </button> `);

			let ok = document.getElementById('ok');

			ok.addEventListener('click', event => {
				event.preventDefault();

				if (demo) demo.parentNode.removeChild(demo);

				console.log('close');
			});

			console.log('preview clicked!!!');
		});
	}

	/**
	 * Returns to previous state or state level(if existent), else, returns to a previous Scene.
	 * - Case there is a previous state, it will remove the current(last) from the stateStack Array.
	 */
	return() {

		if (this.sceneReturn.checked) {
			console.log(this.stateStack);
			this.stateStack.pop();
			console.log(this.stateStack);


			if (this.stateStack.length > 0) {
				let previousTemplate = this.stateStack[this.stateStack.length - 1];

				// necessary for multiple choice leading paths
				if (this.customEarlyContentState && previousTemplate === 'buy_3') {
					// will consistently redirect to the correct previous one from the tree.
					this.nextStateLevel(previousTemplate, this.customEarlyContentState);
				} else
					this.nextStateLevel(previousTemplate);

			} else {
				console.log('I\'ve been checked.');

				this.reset();

				SceneManager.goto('SceneMap');
			}

		}
	}

	/**
	 * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene. 
	 * - Use when heading to another Scene.
	 */
	reset() {
		if (this.sceneModal)
			this.sceneModal.parentNode.removeChild(this.sceneModal);

		this.sceneModal = null;
		this.sceneReturn = null;
		this.itemKeysArray = null;
		this.stateStack = null;
		this.sellOptionStack = null;
		this.buyOptionStack = null;
	}

	shutdown() {
	}
}
