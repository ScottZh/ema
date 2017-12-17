// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';

// // Import RxJs required methods
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';


// import { Hero, heroes } from './data-model';

// @Injectable()
// export class HeroService {
 
//    private baseUrl: string;
//    private hero: Hero;
//    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
//    private options = new RequestOptions({ headers: this.headers }); 
   
//   constructor(private http: Http) {
//     this.baseUrl  = 'http://localhost:3000/'; 
//    }
  

//   getHeroes(): Observable<Hero[]> {
//     return this.http.get(this.baseUrl + 'heroes' )
//           .map(res => res.json())
//          .catch((error: any)=> Observable.throw(error.json().error || 'Server error')); 
//   }
  
//      getHero(id: number |string) {
// 		  return this.http.get(this.baseUrl + 'hero/' + id, this.options)
//       .map(response => response.json())
// 			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
// 	}
//   updateHero(hero: Hero): Observable<Hero>  {

//         let bodyString = JSON.stringify(hero); // Stringify payload
                              
//         return this.http.put(this.baseUrl +hero.id, hero, this.options) // ...using put request
//                          .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
//                          .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
//     } 

//     //  server create; assume nothing can go wrong
//   addHero(hero: Hero)   {

// 		return this.http.post(this.baseUrl + 'hero/', JSON.stringify(hero), this.options)
//       .map(response => response.json())
// 			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
//   }



//    deleteHero(id: number) {
// 		  return this.http.delete(this.baseUrl + 'hero/' + id, this.options)
//       .map(response => response.json())
// 			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
// 	}
// }

