import {Router, Request, Response, NextFunction} from 'express';
import * as config from '../config';
import {dao}  from '../dbconfig/api';


export  class HeroRouter {
  router: Router;
  
  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/:hero', this.create);
    this.router.get('/:hero', this.getAll);
    this.router.get('/:hero/:id', this.getOne);
    this.router.put('/:hero', this.updateOne);
    this.router.delete('/:hero/:id', this.deleteOne);
  }


 /**
   * Initialize the CrudRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * CREATE one hero
   */
  public create(req: Request, res: Response, next: NextFunction) {

    const hero = req.body;
    const Hero = req.params.hero;

    dao.create(hero, Hero, (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(201)
          res.location(`${config.httpHeader}/${hero}/${dbResp.data.insertId}`)
            .send({
              message: 'Success',
              status: res.status,
              data: dbResp.data
            });
      }
    });

  }

  /**
   * GET one hero by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    const heroId = req.params.id;
    const Hero = req.params.hero;

    dao.read(heroId, Hero, (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data: dbResp.data
            });
      }
    });
  }

  /**
   * UPDATE one hero by id
   */
  public updateOne(req: Request, res: Response, next: NextFunction) {
    const Hero = req.params.hero;

      dao.update(req.body, Hero, (dbResp) => {

      if (dbResp.error) {
        res.status(500).send({
          message: `Database error:(${dbResp.error.code}) ${dbResp.error.message}`,
          status: res.status
        });
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data: dbResp.data
            });
      }


    });
  }


  /**
   * GET all Resources.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    const Hero = req.params.hero;

      dao.readAll(Hero, (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data: dbResp.data
            });
      }
    });
  }

  /**
   * DELETE one hero by id
   */
  public deleteOne(req: Request, res: Response, next: NextFunction) {
    const heroId = req.params.id;
    const Hero = req.params.hero;

    dao.remove(heroId, Hero, (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status
            });
      }
    });
  }


}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new HeroRouter();
intialRouter.init();

export const heroRouter = intialRouter.router;
