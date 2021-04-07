import { IResult } from '@entities/Result';
import logger from '@shared/Logger';

import DriverDaoDB from '../Database/DriverDaoDB';

export interface IRaceDao {
    getByRace: (id: number) => Promise<IResult>;
    getByUser: (username: string) => Promise<IResult>;
    getAll: () => Promise<IResult[]>;
}

class RaceDao extends DriverDaoDB implements IRaceDao {


    /**
     * @param email
     */
    public async getByUser(username: string): Promise<IResult> {
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query(`SELECT * from F1ntasy.Users_Guesses where username = (?)`, [username]);
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }

    public async getByRace(id: number): Promise<IResult> {
      const db = await super.openDb();
      let conn;
      try {
          conn = await db.getConnection();
          const rows = await conn.query(`SELECT * from F1ntasy.Users_Guesses where race = (?)`, [id]);
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
    public async getAll(): Promise<IResult[]> {
         // TODO
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query("Select * from F1ntasy.Users_Guesses where Users_Guesses.race in ( SELECT id from F1ntasy.races where DATE(races.date) <= DATE(NOW())) order by Users_Guesses.race");
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }

}

export default RaceDao;
