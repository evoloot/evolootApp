import Parse from 'parse';

/**
 * Parse Environment properties
 * @author Victor V. Piccoli
 */
const environment = {
    serverURL: "https://parseapi.back4app.com",
    liveQueryServerURL: 'wss://evoloottest.back4app.io',
    applicationID: '81X6CAml1OkjiBkHvz8NHRMtqblGkUrxuLf7DE4e',
    javaScriptKey: 'W9anKkCxFzcD9JCiCgNY8tZN122CEqUtmhsOpdWn'
}

/**
 * Parse Initializer
 * @author Victor V. Piccoli
 */
const parseInitializer = () => {
    Parse.serverURL = environment.serverURL;
    Parse.liveQueryServerURL = environment.liveQueryServerURL;
    Parse.initialize(
        environment.applicationID,
        environment.javaScriptKey
    );

    const client = new Parse.LiveQueryClient({
        applicationId: environment.applicationID,
        serverURL: environment.liveQueryServerURL,
        javascriptKey: environment.javaScriptKey
    });
    client.open();
}

export default parseInitializer;