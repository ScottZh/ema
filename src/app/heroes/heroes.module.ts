import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
//import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,  ReactiveFormsModule}    from '@angular/forms';
import { AngularmaterialModule } from '../angularmaterial/angularmaterial.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeroListComponent }    from './hero-list.component';
import { HeroDetailComponent }  from './hero-detail.component';

import { HeroService } from './hero.service';

import { HeroRoutingModule } from './heroes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HeroRoutingModule,
    AngularmaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [ HeroService ]
})
export class HeroesModule {}
