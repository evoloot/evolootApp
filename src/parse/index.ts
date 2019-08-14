import * as Parse from 'parse';
import * as R from 'ramda';
import * as User from "./user";
import {PObject} from "./baas";
//@ts-ignores
Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  '81X6CAml1OkjiBkHvz8NHRMtqblGkUrxuLf7DE4e', 
  'W9anKkCxFzcD9JCiCgNY8tZN122CEqUtmhsOpdWn', 
  '5k77ksv7VK5Fvpa2Yi1XrgOZwsItVXbpXdJXqW5d'
);

// const Avatar = Parse.Object.extend("TestClass");
// const myNewObject = new Avatar();
// const test = PObject.set(myNewObject, "name", "Timothy")
// .set("age", "11")
// .save().then(
//   (result) => {
//     console.log("Test Class created", result.id);
//   }
// )
// User.Auth.signUpUser("kinoar", "kinoarose@gmail.com", "FF2213")
//   .then((user) => {
//     console.log("User object", user);
//     if(user !== null) {
//       console.log("User has signed up with username:", user.getUsername());
//     }
//   })


// myNewObject.save().then(
//   (result) => {
//     if (typeof document !== 'undefined') document.write(`Avatar created: ${JSON.stringify(result)}`);
//     console.log('Avatar created', result);
//   },
//   (error) => {
//     if (typeof document !== 'undefined') document.write(`Error while creating Avatar: ${JSON.stringify(error)}`);
//     console.error('Error while creating Avatar: ', error);
//   }
// );
// ;