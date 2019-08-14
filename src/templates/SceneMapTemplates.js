/*
    SUMMARY

    General Contains: 
    - headerBox
    - alertPopup
    <----------------------------->

    <----------------------------->
*/

/*------------------------- GENERAL --------------------------*/
export const headerBox = `
    <input type="checkbox" class="header__checkbox" id="return">
    <label class="header__nav-button header__nav-button--return" for="return">
        <span class="header__return"><!--icon arrow pointing to left, &lsaquo;, &lang; -->&larr;</span>
    </label>


    <input type="checkbox" class="header__checkbox" id="menu-toggle">
    <label class="header__nav-button header__nav-button--menu" for="menu-toggle">
        <span class="header__menu"></span>
    </label>

    <div class="header__background">&nbsp;</div>
    
    <nav class="header__nav">
        <ul class="header__nav-list">
            <li class="header__nav-item"><a href="#" class="header__nav-link">Buy</a></li>
            <li class="header__nav-item"><a href="#" class="header__nav-link">Sell</a></li>
            <li class="header__nav-item"><a href="#" class="header__nav-link">Map</a></li>
            <li class="header__nav-item"><a href="#" class="header__nav-link" id="logout">Logout</a></li>
        </ul>
    </nav>`;

export const alertPopup = `
    <div class="popup" id="id03">
        <div class="popup__content">

            <div class="popup__text" id="enter-question">
            <!-- <p id='question-text'> Enter Forum? </p> -->
            </div>

        </div>
    </div>`; 

export const popupButtonYesNo = `
    <div class="row">
        <div class="col-1-of-2">
            <button class="button button__green" id="yes">
                <img src="./assets/images/cc_button_gold.png" alt="Yes">
            </button>
        </div>

        <div class="col-1-of-2">
            <button class="button button__red" id="no">
                <img src="./assets/images/cc_button_silver.png" alt="No">
            </button>
        </div>
    </div>`;

export const popupButtonOk = `
    <div class="row">
        <button class="button button__orange" id="no">
            <img src="./assets/images/cc_button_silver.png" alt="No">
        </button>
    </div>`;