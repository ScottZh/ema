import {passwordCryptographer} from './password-cryptographer';
import {User} from './user.model';
import {dao} from '../dbconfig/api';


export namespace userDAO {

  export function create(user: User, password: string, cb) {

   const userCopy = JSON.parse(JSON.stringify(user));

    dao.readOneByField('email', user.email, 'users', (dbResp) => {

      // Condition to create a new is user is no user with this email exists
      // This means that a database error is actually what you expect when creating a new user!
      if (dbResp.error) {
        passwordCryptographer.doHash(password).then((hash: string) => {
          userCopy.password = hash;
          dao.create(userCopy, 'users', cb);
        }, (error) => {
                  return cb({
                    error: {
                      message: 'Problem during hashing'
                    }
                  });
                });

              } else {
                // if a user with this email exists, deny creation
                return cb({
                  error: {
                    message: 'User already exists'
                  }
                });
              }
    });

  }

  export function getByMail(email: string, cb) {
    dao.readOneByField('email', email, 'Users', cb);
  }


  export function getById(id: string, cb) {
    dao.read(id, 'Users', cb);
  }

}