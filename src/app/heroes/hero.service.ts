import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';   
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Hero, heroes } from './data-model';

@Injectable()
export class HeroService {
   heroes: Observable<Hero[]>;
   
   private baseUrl: string; 
   private _heroes: BehaviorSubject<Hero[]>;
   private dataStore: { heroes: Hero[] };
   private hero: Hero;
   private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
   private options = new RequestOptions({ headers: this.headers });




  constructor(private http: HttpClient) {
    this.baseUrl  = 'http://localhost:3000/';
    this.dataStore = {heroes:[]};
    this._heroes = <BehaviorSubject<Hero[]>>new BehaviorSubject([]);
    this.heroes = this._heroes.asObservable();
             
   }

 
  getHeroes() {
    return this.http.get<Hero[]>(this.baseUrl + 'heroes' )
          .subscribe(data =>{          
                    console.log(data);

            this.dataStore.heroes = data;
            this._heroes.next(Object.assign({}, this.dataStore).heroes);
          }, error =>
            console.log('Could not load heroes'));
  }

     getHero(id: number |string) {
		  return this.http.get<Hero>(this.baseUrl + 'hero/' + id)
      .subscribe(data => {
        let notFound = true;
          this.dataStore.heroes.forEach((item, index) => {
            if (item.id === data.id) {
              this.dataStore.heroes[index] = data;
              notFound = false;
            }
      });
            if (notFound) {
        this.dataStore.heroes.push(data);
          
      }

      this._heroes.next(Object.assign({}, this.dataStore).heroes);
    }, error => console.log('Could not load todo.'));
  }

  

    //  server create; assume nothing can go wrong
  addHero(hero: Hero)   {
       console.log('newhero is' +JSON.stringify(hero));
		return this.http.post<Hero>(this.baseUrl + 'hero/', JSON.stringify(hero))
        .subscribe(data => {   
           console.log(data.degree);      
          // this.dataStore.heroes.unshift(data);
          // this._heroes.next(Object.assign({}, this.dataStore).heroes);
        //  this._heroes.next(this._heroes.getValue().push(results));
      },
         (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.");
                }
         }
  )}

updateHero(hero: Hero) {

        let bodyString = JSON.stringify(hero); // Stringify payload

        return this.http.put<Hero>(this.baseUrl +hero.id, bodyString) // ...using put request
          .subscribe(data => {
            this.dataStore.heroes.forEach((t, i) => {
              if (t.id === data.id) { this.dataStore.heroes[i] = data; }
            });

            this._heroes.next(Object.assign({}, this.dataStore).heroes);
   
          
          }, error => console.log('Could not update todo.'));
      }


   deleteHero(id: number) {
		  return this.http.delete<Hero>(this.baseUrl + 'hero/' + id)
      .subscribe(data => {
        console.log("name is " +data.name);
         // this.dataStore.heroes.forEach((t, i) => {
         //   if (t.id === id) { this.dataStore.heroes.splice(i, 1); }
         // });

      //    this._heroes.next(Object.assign({}, this.dataStore).heroes);
      
        },  (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.");
                }
         }

      )}
      }
