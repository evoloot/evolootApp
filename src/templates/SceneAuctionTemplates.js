/*
    SUMMARY

    General Contains: 
    - contentBox
    - contentBoxSearch
    - contentBoxOptions
    <----------------------------->

    Sell Contains:
    - contentBoxOptionsCompany
    - contentBoxOptionsProduct
    - contentBoxOptionsConsole
    - contentBoxOptionsConsoleItems
    - contentBoxSellUsedState
    - contentBoxSellPicureDrop
    - contentBoxSellContentsCondition
    - contentBoxSellAuctionSetup
    - contentBoxSellEnd
    - stepsFooter
    <----------------------------->

    Buy Contains:
    - contentBoxBiding
    <----------------------------->
 */

/*------------------------- GENERAL --------------------------*/
export const headerBox = `
    <input type="checkbox" class="header__checkbox" id="return">
    <label class="header__nav-button header__nav-button--return" for="return">
        <span class="header__return"><!--icon arrow pointing to left, &lsaquo;, &lang; -->&larr;</span>
    </label>

    <h1 class="header__header header-primary" id="headerTitle">The Arena</h1>

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
        </ul>
    </nav>`;

export const contentBox = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-2">
            <button class="button button__animated" id="buy">
                <img src="./assets/images/buyCart.gif" alt="Buy" class="button__animated-image">
            </button>
        </div>

        <div class="col-1-of-2">
            <button class="button button__animated button__animated--sell" id="sell">
                <img src="./assets/images/sell.gif" alt="Sell" class="button__animated-image">
            </button>
        </div>
    </div>
    <div class="row u-maximum-max-width">
        <div class="col-1-of-2">
            <button class="button button__animated button__animated--featured" id="featured">
                <img src="./assets/images/featured.gif" alt="Featured" class="button__animated-image">
            </button>
        </div>

        <div class="col-1-of-2">
            <button class="button button__animated button__animated--showdown" id="showdown">
                <img src="./assets/images/showDown.gif" alt="Showdown" class="button__animated-image">
            </button>
        </div>
    </div>`;

export const contentBoxSearch = '<ul id="searchList" class="row u-maximum-max-width item-box__list"></ul>';

export const contentBoxOptions = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-4">
            <button class="button button__icon" id="videoGames">
                <i class="button__icon-icon--small fas fa-gamepad"></i>
                <h2 class="button__icon-text--small header-secondary">Video Games</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="tradingCards">
                <i class="button__icon-icon--small fab fa-flipboard"></i>
                <h2 class="button__icon-text--small header-secondary">Trading Cards</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="comics">
                <i class="button__icon-icon--small fas fa-book-open"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp;Comics</h2>  
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="boardGames">
                <i class="button__icon-icon--small fas fa-chess-board"></i>
                <h2 class="button__icon-text--small header-secondary">Board Games</h2>
            </button>
        </div>
    </div>

    <div class="row u-maximum-max-width">
        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-exclamation-circle"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp;Other</h2> 
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-exclamation-circle"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp;Other</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-exclamation-circle"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp;Other</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-exclamation-circle"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp;Other</h2>
            </button>
        </div>
    </div>`;

/*------------------------- SELL --------------------------*/
export const contentBoxOptionsCompany = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-4">
            <button class="button button__icon" id="nintendo">
                <i class="button__icon-icon--small fas fa-gamepad"></i>
                <h2 class="button__icon-text--small header-secondary">Nintendo</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fab fa-flipboard"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp; Sony</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-book-open"></i>
                <h2 class="button__icon-text--small header-secondary">Microsoft</h2>  
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-chess-board"></i>
                <h2 class="button__icon-text--small header-secondary">&nbsp; Sega</h2>
            </button>
        </div>
    </div>`;

export const contentBoxOptionsConsole = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-4">
            <button class="button button__icon" id="consoles">
                <i class="button__icon-icon--small fas fa-gamepad"></i>
                <h2 class="button__icon-text--small header-secondary">Consoles</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fab fa-flipboard"></i>
                <h2 class="button__icon-text--small header-secondary">Handhelds</h2>
            </button>
        </div>
    </div>`;

export const contentBoxOptionsProduct = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-4">
            <button class="button button__icon" id="nes">
                <i class="button__icon-icon--small fas fa-gamepad"></i>
                <h2 class="button__icon-text--small header-secondary">NES</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fab fa-flipboard"></i>
                <h2 class="button__icon-text--small header-secondary">SNES</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-book-open"></i>
                <h2 class="button__icon-text--small header-secondary">N64</h2>  
            </button>
        </div>
    </div>`;

export const contentBoxOptionsConsoleItems = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-4">
            <button class="button button__icon" id="consoleGames">
                <i class="button__icon-icon--small fas fa-gamepad"></i>
                <h2 class="button__icon-text--small header-secondary">Games</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fab fa-flipboard"></i>
                <h2 class="button__icon-text--small header-secondary">Hardware</h2>
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-book-open"></i>
                <h2 class="button__icon-text--small header-secondary">Accessories</h2>  
            </button>
        </div>

        <div class="col-1-of-4">
            <button class="button button__icon" id="">
                <i class="button__icon-icon--small fas fa-chess-board"></i>
                <h2 class="button__icon-text--small header-secondary">Bundles</h2>
            </button>
        </div>
    </div>`;



////////////////////////////////////////////////////////////////////////

export const contentBoxSellUsedState = `
    <div class="row u-maximum-max-width">
        <div class="col-1-of-2">
            <div class="dialog__header">
                <h2 class="header-primary--small">New</h2>
            </div>

            <button class="button button__icon--big" id="new">
                <i class="button__icon--big-icon fas fa-gamepad"></i>
            </button>

            <div class="dialog__explanation">
                <p class="paragraph--secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing dolor elit. Sed illum hic magnam.
                </p>
            </div>
        </div>

        <div class="col-1-of-2">
            <div class="dialog__header">
                <h2 class="header-primary--small">Used</h2>
            </div>

            <button class="button button__icon--big" id="used">
                <i class="button__icon--big-icon fas fa-gamepad"></i>
            </button>

            <div class="dialog__explanation">
                <p class="paragraph--secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing dolor elit. Sed illum hic magnam.
                </p>
            </div>
        </div>
    </div>`;

export const contentBoxSellPicureDrop = `
    <div class="row u-maximum-max-width">
            
        <div class="drop-area">
            <div class="row u-maximum-max-width">
                <div class="col-1-of-2">
                    <div class="drop-area__form">
                        <input type="file" name="file" id="file" class="drop-area__input" accept="image/*" data-multiple-caption="{count} files selected" multiple>

                        <label class="drop-area__label" for="file">
                            <img id="picture" class="drop-area__photo">
                            <div class="drop-area__text"> 
                                <p class="paragraph">Upload Picture</p>
                            </div>
                        </label>

                        <button class="button button__green--submit" id="confirm">
                            <h2 class="button__green--submit-text header-secondary">Confirm</h2>
                        </button>
                    </div>
                </div>

                <div class="col-1-of-2">
                    <div class="drop-area__explanation">
                        <p class="paragraph--secondary">            
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero maiores tempora magni repudiandae, adipisci ad earum soluta. Dolorum unde delectus distinctio consequuntur veritatis accusamus minus sed deleniti vel fugit.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero maiores tempora magni repudiandae.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>`;

export const contentBoxSellContentsCondition = `
    <div class="row u-maximum-max-width">
        <div class="form">
            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-2">
                    <div class="dialog__header">
                        <h2 class="header-primary--small">Contents</h2>
                    </div>
                </div>
                <div class="col-1-of-2">
                    <div class="dialog__header">
                        <h2 class="header-primary--small">Condition</h2>
                        <button class="button button__green--question">
                            <h2 class="button__green--question-mark header-secondary">?</h2>
                        </button>
                    </div>
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-2">
                    &nbsp;
                </div>  
                <div class="col-1-of-2">
                    <ul class="dialog__rate-title-list">
                        
                        <li class="dialog__rate-title-item">
                            <label class="dialog__rate-label">
                                <p class="paragraph">Bad</p>
                            </label>
                        </li>
                        <li class="dialog__rate-title-item">
                            <label class="dialog__rate-label">
                                <p class="paragraph">Poor</p>
                            </label>
                        </li>
                        <li class="dialog__rate-title-item">
                            <label class="dialog__rate-label">
                                <p class="paragraph">Average</p>
                            </label>
                        </li>
                        <li class="dialog__rate-title-item">
                            <label class="dialog__rate-label">
                                <p class="paragraph">Good</p>
                            </label>
                        </li>
                        <li class="dialog__rate-title-item">
                            <label class="dialog__rate-label">
                                <p class="paragraph">Excellent</p>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-2">
                    <div class="dialog__checkbox-item">
                        <input type="checkbox" class="dialog__input" id="box">
                        <label class="label dialog__checkbox-label" for="box">
                            <span class="dialog__checkmark"></span>
                            Box
                        </label>
                    </div>  
                </div>

                <div class="col-1-of-2">
                    <ul class="dialog__checkbox-list">
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="bad" name="box" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="poor" name="box" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="average" name="box" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="good" name="box" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="excellent" name="box" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-2">
                    <div class="dialog__checkbox-item">
                        <input type="checkbox" class="dialog__input" id="disc">
                        <label class="label dialog__checkbox-label" for="disc">
                            <span class="dialog__checkmark"></span>
                            Disc/Cart
                        </label>
                    </div>
                </div>

                <div class="col-1-of-2">
                    <ul class="dialog__checkbox-list">
                        <li class="dialog__checkbox--inline">
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="bad" name="disc" class="dialog__input">                            
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="poor" name="disc" class="dialog__input">                            
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="average" name="disc" class="dialog__input">                            
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="good" name="disc" class="dialog__input">                            
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">
                            <label class="dialog__checkbox-label">&nbsp;
                                <input type="radio" disabled="disabled" value="excellent" name="disc" class="dialog__input">                            
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-2">
                    <div class="dialog__checkbox-item">
                        <input type="checkbox" class="dialog__input" id="instructions">    
                        <label class="label dialog__checkbox-label" for="instructions">
                            <span class="dialog__checkmark"></span>
                            Instructions
                        </label>
                    </div>
                </div>

                <div class="col-1-of-2">
                    <ul class="dialog__checkbox-list">
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;    
                                <input type="radio" disabled="disabled" value="bad" name="instructions" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;    
                                <input type="radio" disabled="disabled" value="poor" name="instructions" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;    
                                <input type="radio" disabled="disabled" value="average" name="instructions" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;    
                                <input type="radio" disabled="disabled" value="good" name="instructions" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;    
                                <input type="radio" disabled="disabled" value="excellent" name="instructions" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row u-small-margin-bottom--secondary">
                <div class="col-1-of-2">
                    <div class="dialog__checkbox-item">
                        <input type="checkbox" class="dialog__input" id="extras">
                        <label class="label dialog__checkbox-label" for="extras">
                            <span class="dialog__checkmark"></span>
                            Extras
                        </label>
                        <button class="button button__green--popup" disabled="disabled">
                            <h2 class="button__green--popup-text header-secondary">set description</h2>
                        </button>
                    </div>
                </div>

                <div class="col-1-of-2">
                    <ul class="dialog__checkbox-list">
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;   
                                <input type="radio" disabled="disabled" value="bad" name="extras" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;   
                                <input type="radio" disabled="disabled" value="poor" name="extras" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;   
                                <input type="radio" disabled="disabled" value="average" name="extras" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;   
                                <input type="radio" disabled="disabled" value="good" name="extras" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                        <li class="dialog__checkbox--inline">                            
                            <label class="dialog__checkbox-label">&nbsp;   
                                <input type="radio" disabled="disabled" value="excellent" name="extras" class="dialog__input">
                                <span class="dialog__checkmark--circle"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row">
                <button class="button button__green--submit">
                    <h2 class="button__green--submit-text header-secondary">Confirm</h2>
                </button>
            </div>
        </div>
    </div>`;

export const contentBoxSellAuctionSetup = `
    <div class="row u-maximum-max-width">
        <div class="form">

            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-4">
                    <label class="label dialog__checkbox-label u-padding-none">
                        <p class="paragraph">Auction Style:</p>
                    </label>
                </div>

                <div class="col-1-of-4">                           
                    <label class="label dialog__checkbox-label">Option 1
                        <input type="radio" name="auctionStyle"  value="1" class="dialog__input" checked>
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
                            
                <div class="col-1-of-4">
                    <label class="label dialog__checkbox-label">Option 2
                        <input type="radio" name="auctionStyle"  value="2" class="dialog__input">
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
                        
                <div class="col-1-of-4">
                    <label class="label dialog__checkbox-label">Option 3
                        <input type="radio" name="auctionStyle"  value="3" class="dialog__input">
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
            </div>


            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-4">
                    <label class="label dialog__checkbox-label u-padding-none">
                        <p class="paragraph">Auction Length:</p>
                    </label>  
                </div>

                <div class="col-1-of-4">                          
                    <label class="label dialog__checkbox-label">1 Day
                        <input type="radio" name="auctionLength"  value="1" class="dialog__input" checked>
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>

                <div class="col-1-of-4">          
                    <label class="label dialog__checkbox-label">3 Days
                        <input type="radio" name="auctionLength"  value="3" class="dialog__input">
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>

                <div class="col-1-of-4">                           
                    <label class="label dialog__checkbox-label">7 Days
                        <input type="radio" name="auctionLength"  value="7" class="dialog__input">
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <div class="col-1-of-4">
                    <div class="label dialog__checkbox-label u-padding-none">
                        <p class="paragraph">Minimum Bid Price:</p>
                    </div>  
                </div>

                <div class="col-1-of-4">
                    <label class="label dialog__checkbox-label">$0.25
                        <input type="radio" name="auctionMinimumPrice"  value="0.25" class="dialog__input" checked>
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
                        
                <div class="col-1-of-4">                         
                    <label class="label dialog__checkbox-label">$1.00
                        <input type="radio" name="auctionMinimumPrice"  value="1" class="dialog__input">
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
                        
                <div class="col-1-of-4">                         
                    <label class="label dialog__checkbox-label">$5.00
                        <input type="radio" name="auctionMinimumPrice"  value="5" class="dialog__input">
                        <span class="dialog__checkmark--circle"></span>
                    </label>
                </div>
                        <!--
                <div class="col-1-of-4">  
                    <div class="dialog__checkbox-item">         
                        <button class="button button__green--popup u-margin-none" id="customMinimumBid">
                            <h2 class="button__green--popup-text header-secondary">custom price</h2>
                        </button>
                    </div>
                </div>
                -->
            </div>

            <div class="row u-very-small-margin-bottom">
                <label class="label dialog__checkbox-label u-padding-none" for="auctionStartingPrice">
                    <p class="paragraph">Starting Price:</p>
                </label>  

                <div class="dialog__checkbox-item">
                    <div class="dialog__checkbox-item">
                        <p class="label dialog__checkbox-label u-padding-none">
                            &nbsp;$<input type="number" min="1" id="auctionStartingPrice"  class="dialog__number-input">.00
                        </p>
                        
                        <!--<button class="button button__green--popup" id="customStartingPrice">
                            <h2 class="button__green--popup-text header-secondary">custom price</h2>
                        </button> -->
                    </div>  
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <label class="label dialog__checkbox-label u-padding-none" for="auctionReserveInteger">
                    <p class="paragraph">Reserve:</p>
                </label>  

                <div class="dialog__checkbox-item">
                    <div class="dialog__checkbox-item">
                        <p class="label dialog__checkbox-label u-padding-none">
                            &nbsp;$<input type="number" min="1" id="auctionReserveInteger"  class="dialog__number-input">.<input type="number" min="0" value="0" id="auctionReserveCent"  class="dialog__number-input">
                        </p>
                    </div>  
                </div>
            </div>

            <div class="row u-very-small-margin-bottom">
                <div class="label dialog__checkbox-label u-padding-none">
                    <p class="paragraph">Shipping:</p>
                </div>  
            </div>

            <div class="row u-very-small-margin-bottom">
                <label class="label dialog__checkbox-label u-padding-none" for="auctionReturnPolicy">
                    <p class="paragraph">Return Policy:&nbsp;</p>
                </label> 
                <select class="search__select" id="auctionReturnPolicy">
                    <option value="-- Select --">-- Select --</option>
                    <option value="return">Returns Accepted</option>
                    <option value="noReturn">Returns Not Accepted</option>
                </select>
            </div>

            <div class="row">
                <button class="button button__green--submit" id="confirm">
                    <h2 class="button__green--submit-text header-secondary">Confirm</h2>
                </button>
            </div>

        </div>
    </div>`;

export const contentBoxSellEnd = `
    <div class="row u-maximum-max-width u-small-margin-top">
        <div class="col-1-of-3">
            <div class="dialog__header">
                <h2 class="header-primary--small">View Listing</h2>
            </div>

            <button class="button button__icon--big" id="listing">
                <i class="button__icon--big-icon fas fa-list-alt"></i>
            </button>
        </div>

        <div class="col-1-of-3">
            <div class="dialog__header">
                <h2 class="header-primary--small">Return to Map</h2>
            </div>

            <button class="button button__icon--big" id="map">
                <i class="button__icon--big-icon fas fa-map"></i>
            </button>
        </div>

        <div class="col-1-of-3">
            <div class="dialog__header">
                <h2 class="header-primary--small">Sell Again?</h2>
            </div>

            <button class="button button__icon--big" id="sellAgain">
                <i class="button__icon--big-icon fas fa-dollar-sign"></i>
            </button>
        </div>
    </div>`;

export const stepsFooter = `
    <div class="row">
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>
        <span class="footer__step"></span>

        <button class="button button__green--popup" id="preview">
            <h2 class="button__green--popup-text header-secondary">Preview</h2>
        </button>
    </div>`;

/*------------------------- BUY --------------------------*/
export const contentBoxBiding = `
    <div class="row u-maximum-max-width">
        <div class="item-box">
            <div class="row u-maximum-max-width">

                <div class="col-1-of-3">
                    <div class="row u-very-small-margin-bottom">
                        <div class="item-box__image" id="itemPhotoHolder">
                            <img src="" alt="Game Photo" class="item-box__image-image" id="itemPhoto">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-1-of-2">
                            <button class="button button__arrow" id=""previousGame"">
                                <h2 class="button__arrow-text header-secondary">&larr;</h2>
                            </button>
                        </div>
                        <div class="col-1-of-2">
                            <button class="button button__arrow" id="nextGame">
                                <h2 class="button__arrow-text header-secondary">&rarr;</h2>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-1-of-3">
                    <ul class="item-box__list" id="itemBoxList">
                        <li class="item-box__item" id="itemBoxListPrice">                            
                            <p class="paragraph">Current Price: $1.00</p>
                        </li>
                        <li class="item-box__item" id="itemBoxListTime">                            
                            <p class="paragraph">Time Left: 24m03s</p>
                        </li>
                        <li class="item-box__item" id="itemBoxListSeller">                            
                            <p class="paragraph">Seller: aSeller25</p>
                        </li>
                        <li class="item-box__item" id="itemBoxListBidder">                            
                            <p class="paragraph">High Bidder: </p>
                        </li>
                        <li class="item-box__item" id="itemBoxListUseCondition">                            
                            <p class="paragraph">Condition: Used</p>
                        </li>
                    </ul>
                </div>

                <div class="col-1-of-3">
                    <ul class="item-box__list">
                        <li class="item-box__button-list-item">      
                            <input type="radio" name="box-information" class="dialog__input" id="bidInformation">                      
                            <label class="item-box__checkbox-label" for="bidInformation">
                                <span class="header__return">Bid Info</span>
                            </label>
                        </li>
                        <li class="item-box__button-list-item">       
                            <input type="radio" name="box-information" class="dialog__input" id="details">                      
                            <label class="item-box__checkbox-label" for="details">
                                <span class="header__return">Details</span>
                            </label>
                        </li>
                        <li class="item-box__button-list-item">
                            <input type="radio" name="box-information" class="dialog__input" id="shipping">                      
                            <label class="item-box__checkbox-label" for="shipping">
                                <span class="header__return">Shipping</span>
                            </label>
                        </li>   
                        <li class="item-box__button-list-item">                          
                            <input type="radio" name="box-information" class="dialog__input" id="contact">                      
                            <label class="item-box__checkbox-label" for="contact"> 
                                <span class="header__return">Contact</span>
                            </label>
                        </li>
                        <li class="item-box__button-list-item">                    
                            <input type="radio" name="box-information" class="dialog__input" id="save">                      
                            <label class="item-box__checkbox-label" for="save">
                                <span class="header__return">Save</span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row" id="buttonSlot">
                <button class="button button__green--submit" id="bid">
                    <h2 class="button__green--submit-text header-secondary">Bid</h2>
                </button>
            </div>
        </div>                
    </div>`;