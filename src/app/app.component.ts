import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color = 'primary'> 
    <mat-icon>track_changes</mat-icon>

ShopHub
  <div class="example-sidenav-content">
    <button type="button" mat-button (click)="sidenav.open()">
      <mat-icon>menu</mat-icon>
    </button>
  </div>
      <a mat-button routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a mat-button routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a mat-button routerLink="/contacts" routerLinkActive="active">Contacts</a>
      <a mat-button routerLink="/admin" routerLinkActive="active">Admin</a>
      <a mat-button routerLink="/signin" routerLinkActive="active">Signin</a>
      <a mat-button routerLink="/login" routerLinkActive="active">Login</a>
      <a mat-button [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
</mat-toolbar>

<mat-sidenav-container class="example-container">

  <mat-sidenav #sidenav  class="example-sidenav">
       <mat-nav-list >
      <a mat-list-item routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a mat-list-item routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a mat-list-item routerLink="/admin" routerLinkActive="active">Admin</a>
      <a mat-list-item routerLink="/signin" routerLinkActive="active">Signin</a>
      <a mat-list-item routerLink="/login" routerLinkActive="active">Login</a>
      <a mat-list-item [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
      <a mat-list-item routerLink>Link</a>
    </mat-nav-list>
   
  </mat-sidenav>
    

     <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
</mat-sidenav-container>
  `
})
export class AppComponent {
}
