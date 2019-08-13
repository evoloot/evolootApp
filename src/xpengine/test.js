"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_user_1 = require("../parse/node-user");
const node_dailies_1 = require("./node-dailies");
const node_milestones_1 = require("./node-milestones");
const Parse = require("parse/node");
//@ts-ignore
Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize('81X6CAml1OkjiBkHvz8NHRMtqblGkUrxuLf7DE4e', 'W9anKkCxFzcD9JCiCgNY8tZN122CEqUtmhsOpdWn', '5k77ksv7VK5Fvpa2Yi1XrgOZwsItVXbpXdJXqW5d');
// User Milestone and Daily Creation Test
node_user_1.NodeAuth.signUpUser("test113", "test332@gmail.com", "1234")
    .then(user => {
    node_dailies_1.DailyManager.initializeUserDailies(user);
    node_milestones_1.MilestoneManager.initializeUserMilestones(user);
})
    .catch(console.error);
//Incrementing Auction Information for Dailies and Milestones
node_dailies_1.DailyManager.updateDaily("zpjPJZy9sM", "DAILYAUCTION");
node_milestones_1.MilestoneManager.updateMilestone("zpjPJZy9sM", "WINAUCTION");
