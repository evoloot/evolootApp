import Parse from 'parse';

/**
 * Parse Environment properties
 * @author Victor V. Piccoli
 */
const environment = {
    serverURL: "https://evoloottest.back4app.io",
    liveQueryServerURL: 'wss://evoloottest.back4app.io',
    applicationID: '81X6CAml1OkjiBkHvz8NHRMtqblGkUrxuLf7DE4e',
    javaScriptKey: 'W9anKkCxFzcD9JCiCgNY8tZN122CEqUtmhsOpdWn'
}

/**
 * Parse Initializer
 * @author Victor V. Piccoli
 */
export const parseInitializer = () => {
    Parse.serverURL = environment.serverURL;
    Parse.liveQueryServerURL = environment.liveQueryServerURL;
    Parse.initialize(
        environment.applicationID,
        environment.javaScriptKey
    );
}