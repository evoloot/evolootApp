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

export const startheader = `<img src="assets/images/logo.png" alt="Evoloot Logo" class="tv__logo">`;

export const startBody = `
  <div class="row">
    <div class="col-1-of-3">
      <video controls class="video-box">
        <source src="./assets/video/sampleVideo2.mp4" type="video/mp4">
        <!--<source src="./assets/video/sampleVideo2.ogg" type="video/ogg">-->
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="col-1-of-3">
      <video controls class="video-box">
        <source src="./assets/video/sampleVideo2.mp4" type="video/mp4">
        <!--<source src="./assets/video/sampleVideo2.ogg" type="video/ogg">-->
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="col-1-of-3">
      <video controls class="video-box">
        <source src="./assets/video/sampleVideo2.mp4" type="video/mp4">
        <!--<source src="./assets/video/sampleVideo2.ogg" type="video/ogg">-->
        Your browser does not support the video tag.
      </video>
    </div>

  </div>`;

export const startFooter = `
  <div class="row">

    <div class="col-1-of-2">
      <button class="button button__yellow" id="begin">
        <img src="./assets/images/begin_journey.png" alt="Begin Journey" class="button__img">
      </button>
    </div>

    <div class="col-1-of-2">
      <button class="button button__yellow" id="login">
        <img src="./assets/images/log_in.png" alt="Log In" class="button__img">
      </button>
    </div>

  </div>`;

export const loginBody = `
  <div class="form-box">
    <div class="tv__body form-box__login-area" id="body">
      <div class="row">
        <label for="username" class="label">Email or Username</label>
        <input type="text" name="username" id="username" class="form-box__input" placeholder="" autofocus required>
      </div>

      <div class="row">
        <label for="password" class="label">Password</label>
        <input type="text" name="password" id="password" class="form-box__input" placeholder="" required>

        <button class="button button__search button__search--hide-show">
            <i class="button__search-icon far fa-eye-slash"></i>
        </button>
      </div>

      <div class="row">
        <input type="checkbox" id="remember-me" checked="" class="">
        <label class="label" for="remember-me">Remember me</label>
      </div>
    </div>
  </div>`;


export const loginFooter = `
  <div class="form-box__login-area">
      <div class="row">
          <button class="button button__green--submit button__green--submit--enter" id="enter">
            <h2 class="button__green--submit-text button__green--submit--enter-text header-secondary">login</h2>
          </button>
          <button class="button button__green--submit button__green--submit--forget" id="forget">
            <h2 class="button__green--submit-text header-secondary">Forgot your password?</h2>
          </button>
      </div>
  </div>`;

export const forgetBody = `
  <div class="form-box">
      <div class="tv__body form-box__login-area" id="body">
        <div class="row">
          <p class="paragraph">Please enter your email address. You will</p>
          <p class="paragraph">receive a link to create a new password.</p>
        </div>
        <div class="row">
          <label for="email" class="label">E-mail</label>
          <input type="email" name="username" id="email" class="form-box__input" placeholder="" autofocus required>
        </div>
      </div>
  </div>`;

export const forgetFooter = `
  <div class="form-box__login-area">
    <div class="row">
        <button class="button button__green--submit button__green--submit--enter" id="reset">
          <h2 class="button__green--submit-text button__green--submit--enter-text header-secondary">Reset Password</h2>
        </button>
    </div>
  </div>`;