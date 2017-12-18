

import * as mysql from 'mysql';
import {pool} from './db';
import { Request, Response } from "express";

const db = pool;


export  namespace dao {
     
 export function read(id:string, tableName: string, cb )  {

          const sql = 'SELECT * from ?? WHERE id = ? LIMIT 1';
          db.query(sql, [tableName, id], (error, results)=>{
            if (error) {
              cb({
                error: {
                  message: error.code
                }
              });
            } else {
              if (results) {
                cb({
                  error: null,
                  results: results[0]
                });
              } else {
                cb({
                  error: {
                    message: 'not found'
                  }
                });
              }
            }
          }); 
     }


 export function readAll(tableName: string, cb )  {
     const sql = 'SELECT * from ??';
     db.query(sql, [tableName], (error, results)=>{
      if (error) {
        cb({
          error: {
            message: error.code
          }
        });
      } else {
        if (results) {
          cb({
            error: null,
            results: results
          });
        } else {
          cb({
            error: {
              message: 'not found'
            }
          });
        }
      }
     });
   }
      

  export function readOneByField(fieldName: string, fieldValue: any, tableName: string, cb) {

    const sql = 'SELECT * from ?? WHERE ?? = ? LIMIT 1';

    db.query(sql, [tableName, fieldName, fieldValue], (error, results)=>{
      if (error) {
        cb({
          error: {
            message: error.code
          }
        });
      } else {
        if (results) {
          cb({
            error: null,
            results: results[0]
          });
        } else {
          cb({
            error: {
              message: 'not found'
            }
          });
        }
      }
    });
   }

  export function create(item: Object, tableName: string, cb ){ 

    const keyValuePairs = [];
    Object.keys(item).forEach(key => {
      keyValuePairs.push([key, item[key]]);
    });
    keyValuePairs.push(['createTime', new Date().toLocaleString()]);

    const l = keyValuePairs.length;
    const keyReplacement = Array(l).fill('??').join(', ');
    const valueReplacement = Array(l).fill('?').join(', ');

    const sql = `INSERT INTO ?? (${keyReplacement}) VALUES (${valueReplacement})`;

    db.query(sql,
      [tableName, ...keyValuePairs.map(x => x[0]), ...keyValuePairs.map(x => x[1])],
       (error, results)=>{
         if (error){ throw error;
         } else {
            if(results){ 
        // Retrieve data from database, so the client has the updated object with id, timestamp etc.  
          this.read( results.insertId, tableName, (innerDbResp) =>{
            if (innerDbResp.error) {
              cb({error: innerDbResp.error});
            } else {
              cb({
                error: null,
                data: innerDbResp.results
              });
            }
      })
 
           }else{
            cb({
              error: {
                message: 'not found'
              }
            });
           }
         }
       });
    }


 export function update(  item: object, tableName: string, cb){ 
    
    const id = JSON.parse(JSON.stringify(item)).id;
 
    const keyValuePairs = [];
    Object.keys(item).forEach(key => {
      keyValuePairs.push([key, item[key]]);
    });
     
     keyValuePairs.push(['createTime', 'now()']);
     
    const l = keyValuePairs.length;
    const keyValueReplacement = Array(l).fill('?? = ?').join(', ');

    const sql = `UPDATE ?? SET ${keyValueReplacement} WHERE id = ?`;

    const mergedArray = [];
    keyValuePairs.forEach(pair => {
      mergedArray.push(pair[0]);
      mergedArray.push(pair[1]);
    });

    db.query(sql, [tableName, ...mergedArray, id], (error, results)=>{
      if (error) {
        cb({
          error: {
            message: error.code
          }
        });
      } else {
        if (results) {

          if (results.affectedRows === 1) {

            // Retrieve data from database, so the client has the updated object with id, timestamp etc.
            dao.read(id, tableName, (innerDbResp) => {

              if (innerDbResp.error) {

                cb({error: innerDbResp.error});
              } else {
                cb({
                  error: null,
                  results: innerDbResp.results
                });
              }
            });

          } else {
            cb({
              error: {
                message: `Instead of 1, there were ${results.affectedRows} rows affected`
              }
            });

          }

        } else {
          cb({
            error: {
              message: 'not found'
            }
          });
        }
      }
    });
  }


  export function remove(id, tableName: string,  cb) {

    const sql = `DELETE FROM ?? WHERE _id=?`;
    db.query(sql, [tableName, id], (error, results)=>{
      if (error) {
        cb({
          error: {
            message: error.code
          }
        });
      } else {
        if (results && results.affectedRows === 1) {
          cb({
            error: null,
            results: null
          });
        } else {
          cb({
            error: {
              message: `deleted ${results.affectedRows} items`
            }
          });
        }
      }
    });
  }

}


