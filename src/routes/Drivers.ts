import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import DriverDao from '@daos/Driver/DriverDao';
import { paramMissingError, IRequest } from '@shared/constants';
import logger from '@shared/Logger';
const router = Router();
const driverDao = new DriverDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Drivers - "GET /api/drivers/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const drivers = await driverDao.getAll();
    logger.info(drivers);
    return res.status(OK).json({drivers});
});


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    let driver;
    logger.info(typeof parseInt(id));
    if(parseInt(id)){
        driver = await driverDao.getOne(undefined,parseInt(id));
    } else {
        logger.info(id);
        driver = await driverDao.getOne(id,undefined);
    }
    return res.status(OK).json({driver});
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
