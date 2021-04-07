import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import ResultDao from '@daos/Results/ResultDao';
import { paramMissingError, IRequest } from '@shared/constants';
import logger from '@shared/Logger';
import fetch from 'node-fetch';
import Race from '@entities/Race';
const router = Router();
const resultDao = new ResultDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Drivers - "GET /api/drivers/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const results : any = await resultDao.getAll();
    var races = 0;
    var resultArray : any = [];
    var userPoints : any = {};
    for(var result of results) {
        races = result.race > races ? result.race : races;
        userPoints[result.username] = {totalPoints: 0, correctPos: 0, correctTop5:0}
    }
    for(var i = 0; i < races ; i++) {
        var raceNum = i+1; //Races are 1-indexed in the API and not Zero-indexed
        logger.info(raceNum)
        const tempvalue = await fetch(`http://ergast.com/api/f1/2021/${raceNum}/results.json`);
        const tempjson = await tempvalue.json();
        resultArray[i] = [];
        for(var j = 0; j < 5; j++){
            resultArray[i][j] = tempjson.MRData.RaceTable.Races[i].Results[j].number;
        }
        
    }
    logger.info(resultArray);

    for(let guess of results) {
        var guessArray = [guess.pos1, guess.pos2, guess.pos3, guess.pos4, guess.pos5];
        var raceID = parseInt(guess.race)-1;
        var top5 = resultArray[raceID];

        for(var i = 0; i < guessArray.length; i++){
            logger.info(guessArray[i]);
            logger.info(top5[i]);
            if(guessArray[i] === parseInt(top5[i])){
                userPoints[guess.username].totalPoints += 3;
                userPoints[guess.username].correctPos += 1;
            } else if (top5.includes(String(guessArray[i]))){
                userPoints[guess.username].totalPoints += 1;
                userPoints[guess.username].correctTop5 += 1;
            } 
        }
        
    }
    return res.status(OK).json({userPoints});
});

router.get('/race/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const race = await resultDao.getByRace(parseInt(id));
    const result = await fetch(`http://ergast.com/api/f1/2021/${parseInt(id)}/results.json`);
    const json = await result.json();
    var raceTest : any = race ;
    var resultList = json.MRData.RaceTable.Races[0].Results
    var userPoints: any = {};
    logger.info(JSON.stringify(raceTest));
    for(let guess of raceTest){
        var guessArray = [guess.pos1, guess.pos2, guess.pos3, guess.pos4, guess.pos5];
        logger.info(guess)
        var top5 = [resultList[0].number, resultList[1].number, resultList[2].number, resultList[3].number, resultList[4].number]
        userPoints[guess.username] = {totalPoints: 0, correctPos: 0, correctTop5:0}
        for(var i = 0; i < guessArray.length; i++){
            if(guessArray[i] === parseInt(resultList[i].number)){
                userPoints[guess.username].totalPoints += 3;
                userPoints[guess.username].correctPos += 1;
            } else if (top5.includes(String(guessArray[i]))){
                userPoints[guess.username].totalPoints += 1;
                userPoints[guess.username].correctTop5 += 1;
            } 
        }
    }

    return res.status(OK).json({userPoints});
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
