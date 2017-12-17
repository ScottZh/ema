// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// import { Observable }        from 'rxjs/Observable';

// import { BehaviorSubject } from 'rxjs/BehaviorSubject';


// import { Address, Hero, states }        from './data-model';
// import { HeroService } from './hero.service';

// @Component({
//   selector: 'hero-list',
//   templateUrl: './hero-list.component.html',
//   styleUrls: ['./hero-list.component.css']
// })
// export class HeroListComponent implements OnInit {
//   heroes: Observable<Hero[]>
//   private _heroes: BehaviorSubject<Hero[]>; 
//   private dataStore: { heroes: Hero[] };


//   states = states;
//   isLoading = false;
//   selectedHero: Hero;
//   addnew = false;
//   detail = true;
//   newForm: FormGroup;

//     onNotify(message:string):void {
//     alert(message);
//     this.detail = false;
//   }

//   constructor(  private fb: FormBuilder,
//      private heroService: HeroService
//   ){
//     this.createForm()
//     this.dataStore = {heroes:[]};
//     this._heroes = <BehaviorSubject<Hero[]>>new BehaviorSubject([]);
//     this.heroes = this._heroes.asObservable();
//    }
  
//       createForm() {
//       this.newForm = this.fb.group({
//               name: '',
//               degree: '',
//               secretLairs: this.fb.array([]),
//               power: '',
//               sidekick: ''
//           });
          
//       }
      
//   ngOnInit() { 
//     this.getHeroes();
//    }
  

//   getHeroes() {
//     this.isLoading = true;
    
//         this.heroService.getHeroes()
//         .do(data => console.log('All: ' + JSON.stringify(data)))
//           .subscribe(data => {
//              this.dataStore.heroes = data;
//              this._heroes.next(Object.assign({}, this.dataStore).heroes);
//           }, error =>{
//             console.log('Could not load heroes');
//             this.isLoading = false;
//           }
//       );

//     this.selectedHero = undefined;
//   }

//   select(hero: Hero) { 
//     this.selectedHero = hero; 
//     this.detail = true;
//   }

//   add(){
//       this.addnew = true;
//     }

//    addNew()  { 
//          var newHero = this.prepareNewHero();
//          this.heroService.addHero(newHero)
//            .do(data => console.log('nerHero: ' + JSON.stringify(data)))
//            .subscribe(
//              data => {  
//                this.dataStore.heroes.push(data);
           
//                this._heroes.next(Object.assign({}, this.dataStore).heroes);
//               // this._heroes.next(this._heroes.getValue().concat(newHero));
//             }, error => console.log(error)
//           );
//                 this.selectedHero = null;
//                 this.newForm.reset();
            
//          this.addnew = false;
//          this.selectedHero = undefined;``
//     }
   
//      setAddresses(addresses: Address[]) {
//     const addressFGs = addresses.map(address => this.fb.group(address));
//     const addressFormArray = this.fb.array(addressFGs);
//     this.newForm.setControl('secretLairs', addressFormArray);
//   }

//     get secretLairs(): FormArray {
//     return this.newForm.get('secretLairs') as FormArray;
//   };
//    addLair() {
//     this.secretLairs.push(this.fb.group(new Address()));
//   }
//   prepareNewHero(): Hero {
//     const formModel = this.newForm.value;

//     // deep copy of form model lairs
//     const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
//       (address: Address) => Object.assign({}, address)
//     );

//     // return new `Hero` object containing a combination of original hero value(s)
//     // and deep copies of changed form model values
//     const newHero: any = {

//       name: formModel.name as string,
//       degree: formModel.degree as string,
//       // addresses: formModel.secretLairs // <-- bad!
//       // addresses: secretLairsDeepCopy
//     };
    
//     return newHero;
//   }
   
//    removeHero(hero: Hero){
//      window.confirm('Are you sure to delete  ' +hero.name +'?');
//       //   var index = this.heroes.indexOf(hero);
//       // this.heroes.splice(index, 1);
//      this.heroService.deleteHero(hero.id)
//         .subscribe(response => {
//             this.dataStore.heroes.forEach((t, i) => {
//               if (t.id === hero.id) { this.dataStore.heroes.splice(i, 1); }
//             });

//             this._heroes.next(Object.assign({}, this.dataStore).heroes);
//         }, error => console.log('Could not delete todo.'));
        
//         if (this.selectedHero === hero) { this.selectedHero = null; } 
//     }
  
// }
