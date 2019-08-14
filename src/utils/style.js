export class Style {
    static getContext() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        return ctx;
    }
    static getTitle() {
        const ctx = this.getContext();
        const textGradient = ctx.createLinearGradient(0, 0, 0, 50); //.createLinearGradient(0, 0, 0, 70);
        //  Add in 2 color stops
        textGradient.addColorStop(0, '#00fcff');
        textGradient.addColorStop(1, '#0060ff');
        return {
            fill: textGradient,
            font: '60px Fixedsyswoff',
            strokeThickness: 4
            //fontWeight: 'bold'
        };
    }
    static getText() {
        const ctx = this.getContext();
        const textGradient = ctx.createLinearGradient(0, 0, 0, 30); //.createLinearGradient(0, 0, 0, 70);
        //  Add in 2 color stops
        textGradient.addColorStop(0, '#fff600');
        textGradient.addColorStop(1, '#21c900');
        return {
            fill: textGradient,
            font: '40px Fixedsyswoff',
            strokeThickness: 4
        };
    }
    static getButtonText(sprite) {
        const ctx = this.getContext();
        const textGradient = ctx.createLinearGradient(0, 0, 0, 30); //.createLinearGradient(0, 0, 0, 70);
        //  Add in 2 color stops
        textGradient.addColorStop(0, '#fff600');
        textGradient.addColorStop(1, '#21c900');
        return {
            fill: textGradient,
            font: '21px Fixedsyswoff',
            strokeThickness: 4,
            wordWrap: true,
            wordWrapWidth: sprite.width,
            align: "center"
        };
    }
}
