import React from 'react';

const dotSteps = props => {

    /**
         * Sets a preview window of how the item will look like when at the auction.
         * @param {string} step current auction setup step.
         */
    const preview = step => {

        const inactiveSteps = 9 - step;
        const stepsAccumulator = [];

        for (let i = 0; i < step - 1; ++i) {
            stepsAccumulator.push(<span key={Math.random() * 10000} className="footer__step footer__step--finish"></span>);
        }

        stepsAccumulator.push(<span key={Math.random() * 10000} className="footer__step footer__step--active"></span>);

        for (let i = 0; i < inactiveSteps; ++i) {
            stepsAccumulator.push(<span key={Math.random() * 10000} className="footer__step"></span>);
        }

        return (
            <React.Fragment>
                {stepsAccumulator}
            </React.Fragment>
        );
    }

    const stepDots = preview(props.step);

    return (
        <div className="row">
            {stepDots}
        </div>
    );
}

export default dotSteps;

// part of previous previw functionality, useless right now
/*

     <button className="button button__green--popup" id="preview">
            <h2 className="button__green--popup-text header-secondary">Preview</h2>
        </button>
 

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
        itemPhoto.src = URL.createObjectURL(this.sellOptionStack.photo);
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
}); */