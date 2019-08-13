/* eslint-disable */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parse = require("parse");
const R = require("ramda");
;
var MilestoneManager;
(function (MilestoneManager) {
    MilestoneManager.initializeUserMilestones = (user) => {
        const userMilestone = new Parse.Object("UserMilestones");
        userMilestone.set("winAuction", 0);
        userMilestone.set("upgradeAuction", 0);
        userMilestone.set("gainPositiveFeedback", 0);
        userMilestone.set("inviteFriend", 0);
        userMilestone.set("shareContent", 0);
        userMilestone.set("userId", user.id);
        userMilestone.save()
            .then((milestone) => {
            console.log("Created User Milestone within the database");
        })
            .catch(console.error);
    };
    const incrementSave = (pobject, propertyName) => {
        pobject.increment(propertyName);
        pobject.save().then((milestone) => {
            const milestoneAmount = milestone.get(propertyName);
            const player = {};
            switch (propertyName) {
                case "winAuction":
                    validateWinAuction(player, milestoneAmount);
                    break;
                case "upgradeAuction":
                    validateUpgradeAuction(player, milestoneAmount);
                    break;
                case "gainPositiveFeedback":
                    validateGainPositiveFeedBack(player, milestoneAmount);
                    break;
                case "leaveFeedback":
                    validateLeaveFeedback(player, milestoneAmount);
                    break;
                case "inviteFriend":
                    validateInviteFriend(player, milestoneAmount);
                    break;
                case "shareContent":
                    validateShareContent(player, milestoneAmount);
                    break;
            }
        })
            .catch(console.error);
    };
    MilestoneManager.updateMilestone = (userId, milestoneName) => {
        const curryIncrementSave = R.curry(incrementSave);
        new Parse.Query(Parse.Object.extend("UserMilestones")).equalTo("userId", userId)
            .first()
            .then((milestone) => {
            const incrementMilestone = curryIncrementSave(milestone);
            switch (milestoneName) {
                case "WINAUCTION":
                    incrementMilestone("winAuction");
                    break;
                case "UPGRADEAUCTION":
                    incrementMilestone("upgradeAuction");
                    break;
                case "GAINPOSITIVEFEEDBACK":
                    incrementMilestone("gainPositiveFeedback");
                    break;
                case "LEAVEFEEDBACK":
                    incrementMilestone("leaveFeedback");
                    break;
                case "INVITEFRIEND":
                    incrementMilestone("inviteFriend");
                    break;
                case "SHARECONTENT":
                    incrementMilestone("shareContent");
                    break;
            }
        })
            .catch(console.error);
    };
    function validateWinAuction(player, milestoneAmount) {
        switch (milestoneAmount) {
            case 1:
                player.expSignal.dispatch({
                    type: "win1auction",
                    modifier: 1.0
                });
                break;
            case 5:
                player.expSignal.dispatch({
                    type: "win5auction",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "win10auction",
                    modifier: 1.0
                });
                break;
            case 25:
                player.expSignal.dispatch({
                    type: "win25auction",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "win50auction",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "win100auction",
                    modifier: 1.0
                });
                break;
            case 250:
                player.expSignal.dispatch({
                    type: "win250auction",
                    modifier: 1.0
                });
                break;
            case 500:
                player.expSignal.dispatch({
                    type: "win500auction",
                    modifier: 1.0
                });
                break;
            case 1000:
                player.expSignal.dispatch({
                    type: "win1000auction",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateUpgradeAuction(player, milestoneAmount) {
        switch (milestoneAmount) {
            case 1:
                player.expSignal.dispatch({
                    type: "upgrade1auction",
                    modifier: 1.0
                });
                break;
            case 5:
                player.expSignal.dispatch({
                    type: "upgrade5auction",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "upgrade10auction",
                    modifier: 1.0
                });
                break;
            case 25:
                player.expSignal.dispatch({
                    type: "upgrade25auction",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "upgrade50auction",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "upgrade100auction",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateGainPositiveFeedBack(player, milestoneAmount) {
        switch (milestoneAmount) {
            case 1:
                player.expSignal.dispatch({
                    type: "gain1positivefeedback",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "gain10positivefeedback",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "gain50positivefeedback",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "gain100positivefeedback",
                    modifier: 1.0
                });
                break;
            case 250:
                player.expSignal.dispatch({
                    type: "gain250positivefeedback",
                    modifier: 1.0
                });
                break;
            case 500:
                player.expSignal.dispatch({
                    type: "gain500positivefeedback",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateLeaveFeedback(player, milestoneAmount) {
        switch (milestoneAmount) {
            case 10:
                player.expSignal.dispatch({
                    type: "leave10feedback",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "leave50feedback",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "leave100feedback",
                    modifier: 1.0
                });
                break;
            case 250:
                player.expSignal.dispatch({
                    type: "leave250feedback",
                    modifier: 1.0
                });
                break;
            case 500:
                player.expSignal.dispatch({
                    type: "leave500feedback",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateInviteFriend(player, milestoneAmount) {
        switch (milestoneAmount) {
            case 1:
                player.expSignal.dispatch({
                    type: "invite1friend",
                    modifier: 1.0
                });
                break;
            case 5:
                player.expSignal.dispatch({
                    type: "invite5friend",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "invite10friend",
                    modifier: 1.0
                });
                break;
            case 20:
                player.expSignal.dispatch({
                    type: "invite20friend",
                    modifier: 1.0
                });
                break;
            case 30:
                player.expSignal.dispatch({
                    type: "invite30friend",
                    modifier: 1.0
                });
                break;
            case 40:
                player.expSignal.dispatch({
                    type: "invite40friend",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "invite50friend",
                    modifier: 1.0
                });
                break;
            case 75:
                player.expSignal.dispatch({
                    type: "invite75friend",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "invite100friend",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateShareContent(player, milestoneAmount) {
        switch (milestoneAmount) {
            case 1:
                player.expSignal.dispatch({
                    type: "share1content",
                    modifier: 1.0
                });
                break;
            case 5:
                player.expSignal.dispatch({
                    type: "share5content",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "share10content",
                    modifier: 1.0
                });
                break;
            case 25:
                player.expSignal.dispatch({
                    type: "share25content",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "share50content",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "share100content",
                    modifier: 1.0
                });
                break;
            case 200:
                player.expSignal.dispatch({
                    type: "share200content",
                    modifier: 1.0
                });
                break;
            case 300:
                player.expSignal.dispatch({
                    type: "share300content",
                    modifier: 1.0
                });
                break;
            case 400:
                player.expSignal.dispatch({
                    type: "share400content",
                    modifier: 1.0
                });
                break;
            case 500:
                player.expSignal.dispatch({
                    type: "share500content",
                    modifier: 1.0
                });
                break;
        }
    }
})(MilestoneManager = exports.MilestoneManager || (exports.MilestoneManager = {}));
