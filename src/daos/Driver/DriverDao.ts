import { IDriver } from '@entities/Driver';
import logger from '@shared/Logger';

import DriverDaoDB from '../Database/DriverDaoDB';

export interface IDriverDao {
    getOne: (short: string, id?: number) => Promise<IDriver | null>;
    getAll: () => Promise<IDriver[]>;
}

class DriverDao extends DriverDaoDB implements IDriverDao {


    /**
     * @param email
     */
    public async getOne(short?: string, id?: number): Promise<IDriver | null> {
      const db = await super.openDb();
      let conn;
      let rows;
      try {
          conn = await db.getConnection();
          if(id !== undefined){
            rows = await conn.query("SELECT * from F1ntasy.driver_team where id = (?) ", [id]);
          } else {
            rows = await conn.query("SELECT * from F1ntasy.driver_team where short = (?) ", [short]);
          }

          return rows;
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }
    }


    /**
     *
     */
    public async getAll(): Promise<IDriver[]> {
         // TODO
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query("SELECT * from F1ntasy.driver_team");
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn)  conn.end();
          }
    }

}

export default DriverDao;
