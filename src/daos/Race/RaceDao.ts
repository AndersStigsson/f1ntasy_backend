import { IDriver } from '@entities/Driver';
import logger from '@shared/Logger';

import DriverDaoDB from '../Database/DriverDaoDB';

export interface IRaceDao {
    getOne: (id: number) => Promise<IDriver | null>;
    getAll: () => Promise<IDriver[]>;
}

class RaceDao extends DriverDaoDB implements IRaceDao {


    /**
     * @param email
     */
    public async getOne(id: number): Promise<IDriver | null> {
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query(`SELECT * from F1ntasy.races where id = ${id}`);
            logger.info(rows);
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
            const rows = await conn.query("SELECT * from F1ntasy.races");
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }

    public async getFinished(): Promise<IDriver[]> {
      const db = await super.openDb();
      let conn;
      try {
        conn = await db.getConnection();
        const rows = await conn.query("SELECT * from F1ntasy.races where races.date < NOW()");
        return rows;
      } catch (err) {
        throw err;
      } finally {
        if (conn) conn.end();
      }
    }

    public async getNext(): Promise<IDriver[]> {
      // TODO
     const db = await super.openDb();
     let conn;
     try {
         conn = await db.getConnection();
         const rows = await conn.query("SELECT * from F1ntasy.races where races.date > NOW() LIMIT 1");
         return rows;
       } catch (err) {
         throw err;
       } finally {
         if (conn) conn.end();
       }
 }
}

export default RaceDao;
