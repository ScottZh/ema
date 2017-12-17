import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable }        from 'rxjs/Observable';
import {Observer} from "rxjs/Observer";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Address, Hero, states }        from './data-model';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
   heroes: Observable<Hero[]>;

   

  states = states;
  isLoading = false;
  selectedHero: Hero;
  addnew = false;
  detail = true;
  heroForm: FormGroup;

    onNotify(message:string):void {
    alert(message);
    this.detail = false;
  }

  constructor(  private fb: FormBuilder,
     private heroService: HeroService

  ){
    this.createForm()
   }

      createForm() {
      this.heroForm = this.fb.group({
              name: '',
              degree: '',
              secretLairs: this.fb.array([]),
              power: '',
              sidekick: ''
          });

      }

  ngOnInit() {
    this.heroes = this.heroService.heroes;
    this.isLoading = true;
    this.heroService.getHeroes();
    this.selectedHero = undefined;
   }

    getHeroes() {
    this.isLoading = true;
    this.heroService.getHeroes();
                      
    this.selectedHero = undefined;
  }
  
  select(hero: Hero) {
    this.selectedHero = hero;
    this.detail = true;
  }

  add(){
      this.addnew = true;
    }

   addNew(newHero : Hero)  {
          newHero = this.prepareNewHero();
                    this.heroService.addHero(newHero);
                   
                this.selectedHero =  null;
                this.heroForm.reset();

         this.addnew = false;
         this.selectedHero = undefined;
         
    }

     setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

 
  prepareNewHero(): Hero {
    const formModel = this.heroForm.value;

    const newHero: any = {

      name: formModel.name as string,
      degree: formModel.degree as string,
    };

    return newHero;
  }

   removeHero(hero: Hero){
    //  window.confirm('Are you sure to delete  ' +hero.name +'?');

     this.heroService.deleteHero(hero.id);

        if (this.selectedHero === hero) { this.selectedHero = null; }
    }

}
