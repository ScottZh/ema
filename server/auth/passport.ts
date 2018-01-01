import * as passport from 'passport';
import * as local from 'passport-local';
import {passwordCryptographer} from './password-cryptographer';
import {dao} from '../dbconfig/api';

export namespace passportInit {

  function initializePassportLocalStrategy(): boolean {
    const updatedPassport = passport.use('local', new local.Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password'
      },
      function(email, password, done) {
       dao.readOneByField('email', email, 'users', function (dbResp) {
          if (dbResp.error) {
            // It's better not to disclose whether username OR password is wrong
            return done(null, false, { message: 'Wrong password or username.passport.ts' });
          } else if (!dbResp) {
            return done(null, false, { message: 'Wrong password or username.oassport no data' });
          } else {
            passwordCryptographer.doCompare(password, dbResp.results.password).then(isMatching => {
              if (!isMatching) {
                return done(null, false, { message: 'Wrong password or username.compared no match' });
              } else { 
                return done(null, dbResp.results);
              }
            });
          }
        });

      }
    ));
    return updatedPassport ? true : false;
  }


  export function init(app): string {
    app.use(passport.initialize());
    initializePassportLocalStrategy();
    return 'success';
  }

}  