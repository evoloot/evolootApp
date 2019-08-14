import * as $ from 'jquery';

export class Facebook {
    static initialize() {
        $(document).ready(function () {
            $.ajaxSetup({ cache: true });
            $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
                //Facebook Included into the project
                //@ts-ignore
                FB.init({
                    appId: '705314416512273',
                    version: 'v2.7'
                });
                // FB.getLoginStatus();
            });
        });
    }
    static loginUser() {
        //@ts-ignore
        FB.login((response) => {
            console.log(response);
        }, { scope: 'public_profile,email' });
    }
    static shareLink(link) {
        //@ts-ignore
        FB.ui({
            method: 'share',
            href: link
        }, (response) => {
            console.log(response);
        });
    }
}
