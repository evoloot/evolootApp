import * as Parse from 'parse';

/** 
 * userCharacter
 * Saves character to the current user being created(the 'parent').
 * @param {*} user a valid user.
 */
export const saveUserAvatar = user => {
    const Character = Parse.Object.extend('Character');
    const myNewObject = new Character();

    const localCharacter = JSON.parse(sessionStorage.getItem('character'));

    myNewObject.set('body', JSON.stringify(localCharacter.body));
    myNewObject.set('facialhair', JSON.stringify(localCharacter.facialhair));
    myNewObject.set('hairstyle', JSON.stringify(localCharacter.hairstyle));
    myNewObject.set('upperbody', JSON.stringify(localCharacter.upperbody));
    myNewObject.set('lowerbody', JSON.stringify(localCharacter.lowerbody));
    myNewObject.set('headwear', JSON.stringify(localCharacter.headwear));
    myNewObject.set('facewear', JSON.stringify(localCharacter.facewear));
    myNewObject.set('hands', JSON.stringify(localCharacter.hands));
    myNewObject.set('footwear', JSON.stringify(localCharacter.footwear));
    myNewObject.set('weapon', JSON.stringify(localCharacter.weapon));
    myNewObject.set('eyecolour', JSON.stringify(localCharacter.eyecolour));
    myNewObject.set('level', 1);
    myNewObject.set('experience', 1);
    //myNewObject.set('eyeColour', 'A String');
    //myNewObject.set('hairColour', 'A String');
    //myNewObject.set('mouth', 'A String');
    myNewObject.set('achievementScore', 1);

    myNewObject.set('parent', user);

    return myNewObject.save();
}


/**
 * Retrieves user's character data from database.
 */
export const getCharacter = async(user) => {
    const Character = Parse.Object.extend('Character');
    const query = new Parse.Query(Character);

    try {
        query.equalTo('parent', user).toJSON();
        const search = await query.first();

        const turn = JSON.stringify(search);
        const character = JSON.parse(turn);

        return character;
    }
    catch (error) {
        console.log(error);
    }
}