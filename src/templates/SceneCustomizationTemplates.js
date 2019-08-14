/*
    SUMMARY

    General Contains: 
    - headerBox
    - tvHeader
    - tvFooter
    <----------------------------->

    Form Contains:
    - tvForm
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
        </ul>
    </nav>`;

export const tvHeader = `
    <div class="tv__header-absolute">   
        <h1 class="header-primary">CHARACTER SELECT</h1>
    </div>`;

export const tvFooter = `
    <div class="tv__footer-absolute">
        <div class="col-1-of-2">
            <button class="button button__brown" id="continue">
                <img src="./assets/images/continue.png" alt="continue">
            </button>
        </div>
    </div>`;

/*------------------------- Form --------------------------*/
export const tvForm = `
    <div class="opening opening--no-background-color">
        <div class="tv" id="register">
            <div  class="form">

                <header class="tv__header">
                    <h1 class="header-primary">&nbsp;</h1>
                </header>

                <div class="tv__body tv__body--form">

                <div class="row u-overflow">
                    <div class="col-1-of-2">
                        <div class="form-box">
                            <label for="username" class="label">Username</label>
                            <input class="form-box__input form-box__input--full" type="text" name="username" id="username" placeholder="" autofocus required>
                            <span class="validity"></span>
                            <!---->
                        </div>

                        <div class="form-box">
                            <div class="row">
                            <div class="col-1-of-2">
                                <label for="firstName" class="label">First Name</label>
                                <input class="form-box__input form-box__input--full" name="firstName" id="firstName" placeholder="" type="text" required>
                            </div>

                            <div class="col-1-of-2">
                                <label for="lastName" class="label">Last Name</label>
                                <input class="form-box__input form-box__input--full" name="lastName" id="lastName" placeholder="" type="text" required>
                            </div>
                            </div>
                        </div>

                        <div class="form-box">
                            <label for="birthday" class="label">Date of Birth</label>
                            <input class="form-box__input form-box__input--full form-box__input--date" type="date" name="birthday" id="birthday" placeholder="" required>
                        </div>

                        <div class="form-box">
                            <div class="row">
                            <div class="col-1-of-2">
                                <label for="city" class="label">City</label>
                                <input class="form-box__input form-box__input--full" name="city" id="city" placeholder="" type="text" required>
                            </div>
                            <div class="col-1-of-2">
                                <label for="province" class="label">Province</label>
                                <input class="form-box__input form-box__input--full" name="province" id="province" placeholder="" type="text" required>

                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-1-of-2">
                        <div class="form-box">
                            <label for="email" class="label">E-mail</label>
                            <input class="form-box__input form-box__input--full" type="email" name="email" id="email" placeholder="" required>
                        </div>

                        <div class="form-box">
                            <label for="confirmEmail" class="label">Confirm E-mail</label>
                            <input class="form-box__input form-box__input--full" type="email" name="confirmEmail" id="confirmEmail" placeholder="" required>
                        </div>

                        <div class="form-box">
                            <label for="password" class="label">Password</label>
                            <input class="form-box__input form-box__input--full" type="password" name="password" id="password" placeholder="" required>
                        </div>

                        <div class="form-box">
                            <label for="confirmPassword" class="label">Confirm Password</label>
                            <input class="form-box__input form-box__input--full" type="password" name="confirmPassword" id="confirmPassword" placeholder="" required>
                        </div>
                    </div>
                </div>
                </div>

                <footer class="tv__footer-absolute--submit" id='button_row-2'>
                    <div class="row">
                        <div class="col-1-of-2">
                            <button class="button button__brown" id="save">
                                <img src="./assets/images/continue.png" alt="continue">
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>`;