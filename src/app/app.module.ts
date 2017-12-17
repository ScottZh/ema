import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { Router } from '@angular/router';

import { AngularmaterialModule } from './angularmaterial/angularmaterial.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { HeroesModule }            from './heroes/heroes.module';
import { ComposeMessageComponent } from './compose-message.component';
import { LoginRoutingModule }      from './login-routing.module';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent }          from './login.component';
import { PageNotFoundComponent }   from './not-found.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesModule,
    LoginRoutingModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularmaterialModule,
    FlexLayoutModule

  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    SigninComponent,
    LoginComponent,
    PageNotFoundComponent

  ],
  providers: [
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
