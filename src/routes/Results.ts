import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import ResultDao from "@daos/Results/ResultDao";
import { paramMissingError, IRequest } from "@shared/constants";
import logger from "@shared/Logger";
import fetch from "node-fetch";
import Race from "@entities/Race";
const router = Router();
const resultDao = new ResultDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Drivers - "GET /api/drivers/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  const results: any = await resultDao.getAll();
  var races = 0;
  var resultArray: any = [];
  var userPoints: any = {};
  for (var result of results) {
    races = result.race > races ? result.race : races;
    userPoints[result.username] = {
      totalPoints: 0,
      correctPos: 0,
      correctTop5: 0,
      totalRaces: 0,
    };
  }
  for (var k = 1; k < races + 1; k++) {
    const tempvalue = await fetch(
      `http://ergast.com/api/f1/2022/${k}/results.json`
    );
    const tempjson = await tempvalue.json();

    // for(var i = 0; i < tempjson.MRData.RaceTable.Races.length ; i++) {
    if (k === 4) {
      logger.info(JSON.stringify(tempjson));
    }

    if (tempjson.MRData.RaceTable.Races[0] !== undefined) {
      logger.info("I get to here at k " + k);
      resultArray[k - 1] = [];
      for (var j = 0; j < 5; j++) {
        resultArray[k - 1][j] =
          tempjson.MRData.RaceTable.Races[0].Results[j].number;
      }
    }

    // }
  }
  var awaitingResults = false;
  for (let guess of results) {
    var guessArray = [
      guess.pos1,
      guess.pos2,
      guess.pos3,
      guess.pos4,
      guess.pos5,
    ];
    var raceID = parseInt(guess.race) - 1;
    var top5 = resultArray[raceID];
    userPoints[guess.username].totalRaces += 1;
    if (top5 !== undefined) {
      for (var i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === parseInt(top5[i])) {
          userPoints[guess.username].totalPoints += 3;
          userPoints[guess.username].correctPos += 1;
        } else if (top5.includes(String(guessArray[i]))) {
          userPoints[guess.username].totalPoints += 1;
          userPoints[guess.username].correctTop5 += 1;
        }
      }
    } else {
      awaitingResults = true;
    }
  }
  var values = [];
  for (var user in userPoints) {
    values.push({
      name: user,
      totalPoints: userPoints[user].totalPoints,
      correctPos: userPoints[user].correctPos,
      correctTop5: userPoints[user].correctTop5,
      totalRaces: userPoints[user].totalRaces,
    });
  }
  userPoints = values;
  userPoints.sort((a: any, b: any) => {
    if (a.totalPoints === b.totalPoints) {
      if (b.totalPoints / b.totalRaces === a.totalPoints / a.totalRaces) {
        return b.correctPos - a.correctPos;
      }
      return b.totalPoints / b.totalRaces - a.totalPoints / a.totalRaces;
    }
    return b.totalPoints - a.totalPoints;
  });

  return res
    .status(OK)
    .json({ userPoints: userPoints, awaitingResults: awaitingResults });
});

router.get("/race/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const race = await resultDao.getByRace(parseInt(id));
  const result = await fetch(
    `http://ergast.com/api/f1/2021/${parseInt(id)}/results.json`
  );
  const json = await result.json();
  var raceTest: any = race;
  var resultList = json.MRData.RaceTable.Races[0].Results;
  var userPoints: any = {};
  for (let guess of raceTest) {
    var guessArray = [
      guess.pos1,
      guess.pos2,
      guess.pos3,
      guess.pos4,
      guess.pos5,
    ];
    var top5 = [
      resultList[0].number,
      resultList[1].number,
      resultList[2].number,
      resultList[3].number,
      resultList[4].number,
    ];
    userPoints[guess.username] = {
      totalPoints: 0,
      correctPos: 0,
      correctTop5: 0,
    };
    for (var i = 0; i < guessArray.length; i++) {
      if (guessArray[i] === parseInt(resultList[i].number)) {
        userPoints[guess.username].totalPoints += 3;
        userPoints[guess.username].correctPos += 1;
      } else if (top5.includes(String(guessArray[i]))) {
        userPoints[guess.username].totalPoints += 1;
        userPoints[guess.username].correctTop5 += 1;
      }
    }
  }

  return res.status(OK).json({ userPoints });
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
