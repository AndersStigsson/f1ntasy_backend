import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import UserDao from '@daos/User/UserDao';
import { paramMissingError, IRequest } from '@shared/constants';
import logger from '@shared/Logger';
import { createHmac } from 'crypto';

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
var tokens = {};
const secret = "Formula 1 Pirelli Gran Premio Del Made In Italy E Dell'emilia Romagna 2021"



/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
});



/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});



/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.get('/:id', async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const {password} = req.headers;
    const pass = await userDao.getOne(id);
    if(password === JSON.parse(JSON.stringify(pass))[0].password){
        return res.status(OK).end();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }
    
});

router.post('/login', async (req: IRequest, res: Response) => {
    const {username, password} = req.body;
    var pass = await userDao.getOne(username);
    var id = await userDao.getIdByUsername(username);
    logger.info(`Username is ${username} and password is ${password} whereas pass is ${pass}`);
    if(password === String(pass)){
        const hash = createHmac('sha256', secret)
               .update(username + "Autodromo Enzo e Dino Ferrari")
               .digest('hex');
        logger.info(`ID has value: ${id}`);
        return res.status(OK).json({"loggedIn": true, "token": hash, "user": id});
    } else {
        return res.status(OK).json({"loggedIn": false});
    }
})



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
