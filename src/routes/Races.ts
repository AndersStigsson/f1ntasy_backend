import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import RaceDao from '@daos/Race/RaceDao';
import { paramMissingError, IRequest } from '@shared/constants';
import logger from '@shared/Logger';
const router = Router();
const raceDao = new RaceDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Drivers - "GET /api/drivers/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const races = await raceDao.getAll();
    logger.info(races);
    return res.status(OK).json({races});
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const race = await raceDao.getOne(parseInt(id));
    return res.status(OK).json({race});
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
