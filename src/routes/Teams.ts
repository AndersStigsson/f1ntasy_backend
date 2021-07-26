import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import TeamDao from '@daos/Team/TeamDao';
import { paramMissingError, IRequest } from '@shared/constants';
import logger from '@shared/Logger';
const router = Router();
const teamDao = new TeamDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Drivers - "GET /api/drivers/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const teams = await teamDao.getAll();
    logger.info(teams);
    return res.status(OK).json({teams});
});


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    let team = await teamDao.getOne(id);
    return res.status(OK).json({team});
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
