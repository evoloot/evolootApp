import { Utils } from "../utils/utils";
import { SceneManager } from "../managers/SceneManager";
import * as TitleTemplates from "../templates/SceneTitleTemplates";
import * as Auth from '../parse/user';

/**
 *
 * @by Evoloot Enterprises Inc.
 * @author Victor V. Piccoli, Kino A. Rose
 * @doc Title scene for displaying information on the game and authentication.
 * @class SceneTitle
 * @extends {Phaser.State}
 */
export class SceneTitle extends Phaser.State {
	constructor() {
		super();
	}
	preload() { }

	create() {
		//this.game.add.image(0, 0, 'temporarybg');
		console.log('Scene Title');
		this.addVersionText();
		SceneManager.initialize(this.game);

		this.stateStack = [];
		this.SceneModal;
		this.sceneReturn;

		////////////
		this.createModalStates();

		// Generic, must be made global
		this.nextStateLevel('start'); // Helper.nextStateLevel(mapKey, this.setButtonFunctions() {...});


		this.setButtonFunctions('start');
		/////////////
	}

	update() {
		this.return();
	}

	/**
     * Sets the specific navigation, header, dialog and content box based on the 'mapKey' to show on the screen.
	 * - Each page is that is not heavy game based will usually be composed by a html modal on top. 
	 * - calls insertNewModalContent() function.
	 * - calls setsetButtonFunctions() function.
	 * - inserts current state to the stateStack Array, if not yet added.
     * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
     */
	nextStateLevel(mapKey) {
		const modalTemplate = `
			<div class="opening" id="modal">
				${this.pageState.get(mapKey).nav}
                <div class="tv" id="opening">
        
					<header class="tv__header">
						${this.pageState.get(mapKey).header}
					</header>

					<div class="tv__body" id="body">
						${this.pageState.get(mapKey).content}
					</div>

					<footer class="tv__footer" id="footer">
						${this.pageState.get(mapKey).footer}
					</footer>
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
			nav: '&nbsp',
			header: TitleTemplates.startheader,
			content: TitleTemplates.startBody,
			footer: TitleTemplates.startFooter
		});

		this.pageState.set('login', {
			nav: TitleTemplates.headerBox,
			header: '&nbsp',
			content: TitleTemplates.loginBody,
			footer: TitleTemplates.loginFooter
		});

		this.pageState.set('forget', {
			nav: TitleTemplates.headerBox,
			header: '&nbsp',
			content: TitleTemplates.forgetBody,
			footer: TitleTemplates.forgetFooter
		});

	}

	/**
	 * Displays a new modal to the top a Scene.
	 * - This removes and replaces any current modal displaying.
	 * - Modal is inserted inside the 'root' container.
	 * @param {string} modalTemplate : A html string.
	 */
	insertNewModalContent(modalTemplate) {
		if (this.SceneModal)
			this.SceneModal.parentNode.removeChild(this.SceneModal);

		const body = document.getElementById('root');
		body.insertAdjacentHTML('afterbegin', modalTemplate);
		this.SceneModal = document.getElementById('modal');
		this.sceneReturn = document.getElementById('return');
	}

	/**
     * Sets the functionality of the current 'content' components of the current modal state and level(if present).
     * @param {string} mapKey The mapkey is the key composed by the action and its current level(if more than 1), eg: action_2.
     */
	setButtonFunctions(mapKey) {

		switch (mapKey) {
			case 'start':
				this.start();
				break;
			case 'login':
				this.login();
				break;
			case 'forget':
				this.forget();
		}
	}

	/**
	 * Functionality collection of the Start state.
	 * - 'Login' verifies if 'remember' was marked last time user logged in, which in this case, goes directly to SceneMap,
	 * else goes to 'login' state.
	 * - 'Begin' directs the user to the SceneCustomization.
	 */
	start() {
		this.sceneTitleLogin = document.getElementById('login');
		this.sceneTitleBegin = document.getElementById('begin');

		if (this.sceneTitleLogin)
			this.sceneTitleLogin.addEventListener('click', event => {
				event.preventDefault();

				// if remember me was enabled, login automatically 
				if (localStorage.getItem('remember') && JSON.parse(localStorage.getItem('remember')).remember) {
					this.reset();

					SceneManager.goto('SceneMap');
				}
				else
					this.nextStateLevel('login');

			});

		if (this.sceneTitleBegin)
			this.sceneTitleBegin.addEventListener('click', event => {
				event.preventDefault();

				this.reset();

				SceneManager.goto('SceneCustomization');
			});
	}

	/**
	 * Functionality collection of the Login state.
	 * - 'Show or hide password' changes the icon and the input type of the password text field to 'text' or 'password' respectively.
	 * - 'Enter' calls the loginUser() async function.
	 * - 'Forget' directs the user to the forget state.
	 */
	login() {
		const header = document.querySelector('.tv__header');
		const footer = document.querySelector('.tv__footer');
		const enter = document.getElementById('enter');
		const userName = document.getElementById('username');
		const password = document.getElementById('password');
		const showHidePassword = document.querySelector('.button__search--hide-show');
		const eyeIcon = document.querySelector('.button__search-icon');
		const remember = document.getElementById('remember-me');

		if(header) header.parentNode.removeChild(header);
		if(footer) footer.parentNode.removeChild(footer);

		if (showHidePassword && password)
			showHidePassword.addEventListener('click', event => {
				event.preventDefault();

				// hide
				if ('password' === password.getAttribute('type')) {
					// change icon
					if (eyeIcon) eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');

					// change pass input type to text
					password.setAttribute('type', 'text');
				}
				// show 
				else {
					// change icon 
					if (eyeIcon) eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');

					// change pass input type to password
					password.setAttribute('type', 'password');
				}

			});

		if (enter)
			enter.addEventListener('click', event => {
				event.preventDefault();

				if (userName && password && remember) this.loginUser(userName.value.trim(), password.value, remember);
			});

		if (forget)
			forget.addEventListener('click', event => {
				event.preventDefault();

				this.nextStateLevel('forget');
			});
	}

	/**
	 * Functionality collection of the Forget state.
	 * 'Reset' calls the resetPassword() async function.
	 */
	forget() {
		const footer = document.querySelector('.tv__footer');
		const header = document.querySelector('.tv__header');
		const reset = document.getElementById('reset');
		const email = document.getElementById('email');

		if(header) header.parentNode.removeChild(header);
		if(footer) footer.parentNode.removeChild(footer);

		if (reset)
		reset.addEventListener('click', event => {
			event.preventDefault();

			if (email && email.value.trim() !== '') this.resetPassword(email.value.trim());
		});
	}

	/**
	 * Sends an reset password email to the user if an valid/existent email has been provided.
	 * - On sucess or fail, a feedback will be sent to the user on screen.
	 * @param {string} email : string provided in the email text field. 
	 */
	async resetPassword(email) {
		const place = document.getElementById('email');
		const messageValid = document.querySelector('.tv__reset--valid');
		const messageError = document.querySelector('.tv__reset--error');

		if (messageValid) messageValid.parentNode.removeChild(messageValid);
		if (messageError) messageError.parentNode.removeChild(messageError);

		try {
			await Auth.resetPassword(email);

			if (place) place.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--valid">A Password Reset E-mail has been sent to you!</span>');

		} catch (error) {
			console.log(error);

			if (place) place.insertAdjacentHTML('afterend', '<span class="tv__sigin-error tv__reset--error">No user found with this e-mail!</span>');
		}
	}

	/**
	 * Performs authentication of the user, that if successful directs him to the SceneMap.
	 * - If remember is checked, next time user 'logs in' the 'login' state will be jumped. 
	 * This information is saved in the localStorage.
	 * - On fail, will give the according feedback error to user on the screen.
	 * @param {string} user user's username or email. 
	 * @param {string} pass user's password.
	 * @param {string} remember 'remember' checkbox value.
	 */
	async loginUser(user, pass, remember) {
		const place = document.getElementById('username');
		const message = document.querySelector('.tv__sigin-error');

		console.log('username: ' + user);

		try {
			await Auth.signIn(user, pass);

			if (remember) {
				// save user credentials in local storage if remember is checked
				if (remember.checked) localStorage.setItem('remember', JSON.stringify({ remember: true }));
				else localStorage.setItem('remember', JSON.stringify({ remember: false }));
			}

			this.reset();

			SceneManager.goto('SceneMap');
		} catch (error) {
			console.log(error);
			console.log(error.name);
			console.log(error.message);

			let sendError;

			if (place) {
				if (message) message.parentNode.removeChild(message);

				switch (error.message) {
					case 'username/email is required.': sendError = '<span class="tv__sigin-error">Enter your Email/Username and Password!</span>';
						break;
					case 'password is required.': sendError = '<span class="tv__sigin-error">You must enter your password!</span>';
						break;
					case 'Invalid username/password.': sendError = '<span class="tv__sigin-error">Wrong Email/Username or Password!</span>';
				}

				place.insertAdjacentHTML('afterend', sendError);
			}

		}
	}

	/**
	 * Destroys, kills, remove modals, or turn to null ALL objects of THIS Scene. 
	 * - Use when heading to another Scene.
	 */
	reset() {
		if (this.SceneModal)
			this.SceneModal.parentNode.removeChild(this.SceneModal);

		this.SceneModal = null;
		this.sceneReturn = null;
		this.pageState = null;
		this.sceneTitleLogin = null;
		this.sceneTitleBegin = null;
	}

	/**
	 * Returns to previous state or state level(if existent), else, returns to a previous Scene.
	 * - Case there is a previous state, it will remove the current(last) from the stateStack Array.
	 */
	return() {

		if (this.sceneReturn && this.sceneReturn.checked) {
			this.stateStack.pop();

			if (this.stateStack.length > 0) {
				const previousTemplate = this.stateStack[this.stateStack.length - 1];
				this.nextStateLevel(previousTemplate);
			}

		}
	}

	addVersionText() {
		this['versionText'] =
			this.game.add.text(0, 0, `Version: ${Utils.VERSION}`, { font: "20px Arial", fill: 'white' });
	}
	shutdown() {
	}
}
