import {Router, Request, Response, NextFunction} from 'express';
import * as config from '../config';
import {dao}  from '../dbconfig/api';


export  class CatRouter {
  router: Router;
  
  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/cat', this.create);
    this.router.get('/cat', this.getAll);
    this.router.get('/cat/:id', this.getOne);
    this.router.put('/cat', this.updateOne);
    this.router.delete('/cat/:id', this.deleteOne);
  }


 /**
   * Initialize the CrudRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }


    /**
   * GET all Resources.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    const tableName:string = "cats";
    console.log('get data from table ' + tableName);
      dao.readAll(tableName, (dbResp) => {
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
   * CREATE one cat
   */
  public create(req: Request, res: Response, next: NextFunction) {

    const cat = req.body;
    const tableName:string = "cats";
    
    dao.create(cat, tableName, (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(201)
          res.location(`${config.httpHeader}/${tableName}/${dbResp.data.insertId}`)
            .send({
              message: 'Success',
              status: res.status,
              data: dbResp.data
            });
      }
    });

  }

  /**
   * GET one cat by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    const catId = req.params.id;
    const tableName:string = "cats";

    dao.read(catId, tableName, (dbResp) => {
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
   * UPDATE one cat by id
   */
  public updateOne(req: Request, res: Response, next: NextFunction) {
    const tableName:string = "cats";

      dao.update(req.body, tableName, (dbResp) => {

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
   * DELETE one cat by id
   */
  public deleteOne(req: Request, res: Response, next: NextFunction) {
    const catId = req.params.id;
    const tableName:string = "cats";

    dao.remove(catId, tableName, (dbResp) => {
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
const intialRouter = new CatRouter();
intialRouter.init();

export const catRouter = intialRouter.router;
