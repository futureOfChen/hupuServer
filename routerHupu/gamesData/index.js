const express = require('express');
const gamesDataRouter = express.Router();
let todayGames = require('./data/todayGames.json'); 
let teamRank = require('./data/teamRank.json'); 
let scoreRank = require('./data/scoreRank.json'); 
let playerRank = require('./data/playerRank.json'); 

gamesDataRouter.get('/todayGames', (req, res, next) => {
    // let query = req.query;
    res.status(200);
    res.json({
        data: {
            games:todayGames
        },
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
gamesDataRouter.get('/teamRank', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            teamRank:teamRank 
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
gamesDataRouter.get('/scoreRank', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            scoreRank:scoreRank 
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});
gamesDataRouter.get('/playerRank', (req, res, next) => {
    res.status(200);
    res.json({
        data: {
            playerRank:playerRank 
        },
        resp: 00,
        msg: '成功',
        statusCode: 200
    });
    // res.json({state:'01'})
});

module.exports = gamesDataRouter;

