import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import GuessDao from '@daos/Guesses/GuessDao';
import UserDao from '@daos/User/UserDao';
import { paramMissingError, IRequest } from '@shared/constants';
import logger from '@shared/Logger';
import fetch from 'node-fetch';
import Race from '@entities/Race';
import { createHmac } from 'crypto';

const router = Router();
const guessDao = new GuessDao();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


router.post('/add', async (req: Request, res: Response) => {
    var userId = req.body.user;
    var guesses = req.body.guesses;
    var raceId = req.body.raceId;
    var hash = req.body.userhash;
    const username : any = await userDao.getUsernameById(userId);
    const verified = userDao.verifyUserCredentials(username, hash);
    if(!verified){
        res.status(403).json({"error" : "You are not who you claim to be. Don't try to trick me"});
    } else {
        const previousGuess : any = await guessDao.getByRaceAndUser(raceId, userId);
        logger.info(JSON.stringify(previousGuess));
        if(previousGuess.length > 0){
            const result = await guessDao.update(raceId, guesses, userId);
            res.status(OK).json({result});
        } else {
            const result = await guessDao.add(raceId, guesses, userId);
            res.status(OK).json({result});
        }
    }
    
    
    
})

router.get('/all', async (req: Request, res: Response) => {
    res.json({error: "Not yet implemented"});
});

router.get('/race/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    var username : undefined | string = req.query.username?.toString();
    
    if(username !== undefined){
        var userId = parseInt(username);
        const guesses = await guessDao.getByRaceAndUser(parseInt(id), userId);
        logger.info(JSON.stringify(guesses));
        res.status(OK).json({guesses});
    } else {
        const guesses = await guessDao.getByRace(parseInt(id));
        logger.info(guesses);
        res.status(OK).json({guesses});
    }
    
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
