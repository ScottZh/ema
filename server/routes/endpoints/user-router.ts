import {Router, Request, Response, NextFunction} from 'express';
import {userDAO} from '../../auth';
import {dao} from '../../dbconfig/api';

export class UserRouter {
  router: Router;

  /**
   * Take login handler and attach to login endpoint, but precede it with authentication
   */
  init() {
    this.router.post('/users',
        this.postHandler);
   //     this.router.post('/users',
   //     function (req, res) {
   //       res.send("post router called")});
    this.router.get('/users/:id',
    this.getHandler);
  }

  /**
   * Initialize the login
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  private postHandler(req: Request, res: Response, next: NextFunction) {
    console.log( "post username is: " +req.body.username + ", password: " + req.body.password)
       const user = req.body;
    userDAO.create(user, req.body.password, (dbResp => {
      if (dbResp.error) {
        if (dbResp.error.message === 'User already exists') {
          res.statusMessage = dbResp.error.message;
          res.status(403).send('problem 403 create user');
        } else {
          res.statusMessage = dbResp.error.message;
          res.status(500).send('problem 500 create user');
        }
      } else {
        res.status(200).send({
          message: 'Success create user',
          status: res.status,
          data: dbResp.data
        });
      }
    }));
  }

  private getHandler(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;

      dao.read(userId, 'users', (dbResp) => {
      if (dbResp.error) {
        res.status(500).send({
          message: 'Server error',
          status: res.status
        });
      } else {
        res.status(200)
            .send({
              message: 'Success get user',
              status: res.status,
              data: dbResp.data
            });
      }
    });
  }

}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new UserRouter();
intialRouter.init();  

export const userRouter = intialRouter.router;