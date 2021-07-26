import { IGuess } from '@entities/Guess';
import logger from '@shared/Logger';

import DriverDaoDB from '../Database/DriverDaoDB';

export interface IGuessDao {
    getByRace: (id: number) => Promise<IGuess>;
    getByUser: (username: string) => Promise<IGuess>;
    getAll: () => Promise<IGuess[]>;
    add: (raceId: number, guesses: Array<any>, userId: number) => Promise<IGuess>;
    update: (raceId: number, guesses: Array<any>, userId: number) => Promise<IGuess>;
    getByRaceAndUser: (id: number, username: number) => Promise<IGuess>;
}

class GuessDao extends DriverDaoDB implements IGuessDao {

    public async add(raceId: number, guesses: Array<any>, userId: number): Promise<IGuess> {
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            var p1 = guesses[0].id;
            var p2 = guesses[1].id;
            var p3 = guesses[2].id;
            var p4 = guesses[3].id;
            var p5 = guesses[4].id;

            const rows = await conn.query(`INSERT INTO F1ntasy.guesses values ((?),(?),(?),(?),(?),(?),(?),DATE(NOW()))`, [raceId, userId, p1, p2, p3, p4, p5]);
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }

    public async update(raceId: number, guesses: Array<any>, userId: number): Promise<IGuess> {
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            var p1 = guesses[0].id;
            var p2 = guesses[1].id;
            var p3 = guesses[2].id;
            var p4 = guesses[3].id;
            var p5 = guesses[4].id;

            const rows = await conn.query(`Update F1ntasy.guesses set pos1=(?), pos2=(?), pos3=(?), pos4=(?), pos5=(?) where race=(?) and user=(?)`, [p1, p2, p3, p4, p5, raceId, userId]);
            logger.info(rows);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }

    /**
     * @param email
     */
    public async getByUser(username: string): Promise<IGuess> {
        const db = await super.openDb();
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query(`SELECT * from F1ntasy.Users_Guesses where username = (?)`, [username]);
            return rows;
          } catch (err) {
            throw err;
          } finally {
            if (conn) conn.end();
          }
    }

    public async getByRace(id: number): Promise<IGuess> {
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

  public async getByRaceAndUser(id: number, user: number): Promise<IGuess> {
    const db = await super.openDb();
    let conn;
    try {
        conn = await db.getConnection();
        const rows = await conn.query(`SELECT * from F1ntasy.Users_Guesses where race = (?) and user = (?)`, [id, user]);
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
    public async getAll(): Promise<IGuess[]> {
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

export default GuessDao;
