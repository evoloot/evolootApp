"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parse = require("parse/node");
const R = require("ramda");
;
//Server timestamps for everything except login daily bonus
var DailyManager;
(function (DailyManager) {
    DailyManager.initializeUserDailies = (user) => {
        const userDailies = new Parse.Object("UserMilestones");
        userDailies.set("dailyAuctionWin", 0);
        userDailies.set("dailyAuctionListing", 0);
        userDailies.set("dailyBugReport", 0);
        userDailies.set("dailyConstructiveFeedback", 0);
        userDailies.set("userId", user.id);
        userDailies.save()
            .then((milestone) => {
            console.log("Created User Dailies within the database");
        })
            .catch(console.error);
    };
    const incrementSave = (pobject, propertyName) => {
        pobject.increment(propertyName);
        pobject.set(propertyName + "Timestamp", new Date(Date.now()));
        pobject.save().then(daily => {
            const dailyAmount = daily.get(propertyName);
            const dailyTimestamp = daily.get(propertyName + "Timestamp");
            const player = {};
            switch (propertyName) {
                case "dailyAuctionWin":
                    validateWinAuction(player, dailyAmount, dailyTimestamp);
                    break;
                case "dailyAuctionListing":
                    validateAuctionListing(player, dailyAmount, dailyTimestamp);
                    break;
                case "dailyBugReport":
                    validateBugReport(player, dailyAmount, dailyTimestamp);
                    break;
                case "dailyConstructiveFeedback":
                    validateConstructiveFeedback(player, dailyAmount, dailyTimestamp);
                    break;
            }
        })
            .catch(console.error);
    };
    DailyManager.updateDaily = (userId, dailyName) => {
        const curryIncrementSave = R.curry(incrementSave);
        const playerDaily = new Parse.Query(Parse.Object.extend("UserDailies")).equalTo("userId", userId)
            .first();
        playerDaily.then(daily => {
            const amount = getNecessaryAmount(daily, dailyName);
            const timestamp = getNecessaryTimestamp(daily, dailyName);
            const dateNow = new Date(Date.now());
            const incrementDaily = curryIncrementSave(daily);
            if (Math.abs(dateNow.getHours() - timestamp.getHours()) > 24) {
                // reset timestamp
                resetTimestamp(daily, dailyName);
            }
            else {
                switch (dailyName) {
                    case "DAILYAUCTION":
                        if (amount < 50)
                            incrementDaily("dailyAuctionWin");
                        break;
                    case "DAILYLISTING":
                        if (amount < 100)
                            incrementDaily("dailyAuctionListing");
                        break;
                    case "DAILYBUGREPORT":
                        if (amount < 1)
                            incrementDaily("dailyBugReport");
                        break;
                    case "DAILYCONSTRUCTIVEFEEDBACK":
                        if (amount < 1)
                            incrementDaily("dailyConstructiveFeedback");
                        break;
                }
            }
        })
            .catch(console.error);
    };
    function resetTimestamp(daily, dailyName) {
        switch (dailyName.toUpperCase()) {
            case "DAILYAUCTION":
                daily.set("dailyAuctionTimestamp", new Date(Date.now()));
                break;
            case "DAILYLISTING":
                daily.set("dailyAuctionlistingTimestamp", new Date(Date.now()));
                break;
            case "DAILYBUGREPORT":
                daily.set("dailyBugReportTimestamp", new Date(Date.now()));
                break;
            case "DAILYCONSTRUCTIVEFEEDBACK":
                daily.set("dailyConstructiveFeedbackTimestamp", new Date(Date.now()));
                break;
        }
        daily.save().catch(console.error);
    }
    function getNecessaryTimestamp(daily, dailyName) {
        switch (dailyName.toUpperCase()) {
            case "DAILYAUCTION":
                return daily.get("dailyAuctionTimestamp");
            case "DAILYLISTING":
                return daily.get("dailyAuctionlistingTimestamp");
            case "DAILYBUGREPORT":
                return daily.get("dailyBugReportTimestamp");
            case "DAILYCONSTRUCTIVEFEEDBACK":
                return daily.get("dailyConstructiveFeedbackTimestamp");
        }
    }
    function getNecessaryAmount(daily, dailyName) {
        switch (dailyName.toUpperCase()) {
            case "DAILYAUCTION":
                return daily.get("dailyAuction");
            case "DAILYLISTING":
                return daily.get("dailyAuctionlisting");
            case "DAILYBUGREPORT":
                return daily.get("dailyBugReport");
            case "DAILYCONSTRUCTIVEFEEDBACK":
                return daily.get("dailyConstructiveFeedback");
        }
    }
    function validateWinAuction(player, dailyAmount, timestamp) {
        switch (dailyAmount) {
            case 1:
                player.expSignal.dispatch({
                    type: "win1auctiondaily",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "win10auctiondaily",
                    modifier: 1.0
                });
                break;
            case 25:
                player.expSignal.dispatch({
                    type: "win25auctiondaily",
                    modifier: 1.0,
                });
            case 50:
                player.expSignal.dispatch({
                    type: "win50auctiondaily",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateAuctionListing(player, dailyAmount, timestamp) {
        switch (dailyAmount) {
            case 5:
                player.expSignal.dispatch({
                    type: "list5auctiondaily",
                    modifier: 1.0
                });
                break;
            case 10:
                player.expSignal.dispatch({
                    type: "list10auctiondaily",
                    modifier: 1.0
                });
                break;
            case 25:
                player.expSignal.dispatch({
                    type: "list25auctiondaily",
                    modifier: 1.0
                });
                break;
            case 50:
                player.expSignal.dispatch({
                    type: "list50auctiondaily",
                    modifier: 1.0
                });
                break;
            case 100:
                player.expSignal.dispatch({
                    type: "list100auctiondaily",
                    modifier: 1.0
                });
                break;
        }
    }
    function validateBugReport(player, dailyAmount, timestamp) {
        if (dailyAmount === 1) {
            player.expSignal.dispatch({
                type: "dailybugreport",
                modifier: 1.0
            });
        }
    }
    function validateConstructiveFeedback(player, dailyAmount, timestamp) {
        if (dailyAmount === 1) {
            player.expSignal.dispatch({
                type: "dailyconstructivefeedback",
                modifier: 1.0
            });
        }
    }
})(DailyManager = exports.DailyManager || (exports.DailyManager = {}));
