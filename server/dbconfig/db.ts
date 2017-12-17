

import * as mysql from 'mysql';

const pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'shop_db'
});

     pool.getConnection(function(err,connection){
        if (err) {
        console.error('error connecting: ' + err.stack);
        return;

        }

        console.log('Dbconnected as id ' + connection.threadId);
     
  });

export  {pool};
