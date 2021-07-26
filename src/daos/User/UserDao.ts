import DriverDaoDB from '@daos/Database/DriverDaoDB';
import { IUser } from '@entities/User';
import logger from '@shared/Logger';
import { createHmac } from 'crypto';



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


    public async getIdByUsername(username: string): Promise<IUser | string | null> {
      const db = await super.openDb();
      let conn;
      try {
          conn = await db.getConnection();
          const rows = await conn.query("SELECT id from F1ntasy.users where username = (?)", [username]);
          
          return rows[0].id;
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }
    }

    public async getUsernameById(id: number): Promise<IUser | string | null> {
      const db = await super.openDb();
      let conn;
      try {
          conn = await db.getConnection();
          const rows = await conn.query("SELECT username from F1ntasy.users where id = (?)", [id]);
          
          return rows[0].username;
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }
  }

  public verifyUserCredentials(username: string, userhash: string): boolean {
    const secret = "Formula 1 Pirelli Gran Premio Del Made In Italy E Dell'emilia Romagna 2021"
    const hash = createHmac('sha256', secret)
    .update(username + "Autodromo Enzo e Dino Ferrari")
    .digest('hex');
    if(userhash === hash) {
      return true;
    }
    return false;
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
