import {NodeAuth} from "../parse/node-user";
import {DailyManager} from "./node-dailies";
import {MilestoneManager} from "./node-milestones";
import * as Parse from "parse/node";
//@ts-ignore

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  '81X6CAml1OkjiBkHvz8NHRMtqblGkUrxuLf7DE4e',
  'W9anKkCxFzcD9JCiCgNY8tZN122CEqUtmhsOpdWn',
  '5k77ksv7VK5Fvpa2Yi1XrgOZwsItVXbpXdJXqW5d'
);

// User Milestone and Daily Creation Test
NodeAuth.signUpUser("test113", "test332@gmail.com", "1234")
.then(user => {
  DailyManager.initializeUserDailies(user);
  MilestoneManager.initializeUserMilestones(user);
})
.catch(console.error);

//Incrementing Auction Information for Dailies and Milestones
DailyManager.updateDaily("zpjPJZy9sM", "DAILYAUCTION");
MilestoneManager.updateMilestone("zpjPJZy9sM", "WINAUCTION");