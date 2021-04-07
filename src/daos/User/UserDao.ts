import DriverDaoDB from '@daos/Database/DriverDaoDB';
import { IUser } from '@entities/User';
import logger from '@shared/Logger';



export interface IUserDao {
    getOne: (username: string) => Promise<IUser | string | null>;
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class UserDao extends DriverDaoDB implements IUserDao {


    /**
     * @param email
     */
    public async getOne(username: string): Promise<IUser | string | null> {
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query("SELECT password from F1ntasy.users where username = (?)", [username]);
            
            return rows[0].password;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }


    /**
     *
     */
    public getAll(): Promise<IUser[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default UserDao;
