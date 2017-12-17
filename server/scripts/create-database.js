import * as mysql from 'mysql';
const db = require('../dbconfig/db');



db.query('CREATE DATABASE ' + dbconfig.pool);

db.query('\
CREATE TABLE `' + db.pool.config.database + '`.`' + users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
