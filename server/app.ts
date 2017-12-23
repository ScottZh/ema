
import { json, urlencoded } from "body-parser";
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';

import {passportInit, 
        welcomeHtmlRouter,
        loginRouter,
        simpleCrudRouter,
        userRouter,
        catRouter,
        heroRouter
      } from './routes';

const app: express.Application = express();

app.disable("x-powered-by");

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));


// passport config
passportInit.init(this.app);

 // intercept favicon
  app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

 // Allow CORS since frontend is served completely independently
 this.app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// api routes
app.use("/api", catRouter);
app.use("/api", heroRouter);
app.use('/', welcomeHtmlRouter);

// API
app.use('/api/v1/', loginRouter);
app.use('/api/v1/', userRouter);

// The simpleCrudRouter one should stay last, since it covers quite a broad range of requests and if it's moved above
// it will steal away the endpoints of the more specific implementations
app.use('/api/v1/', simpleCrudRouter);



// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});


  export { app };
