import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AuthAdmin } from './guards/auth.admin';
import { ConfComponent } from './components/conf/conf.component';
import { AdjustmentComponent } from './components/adjustment/adjustment.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { AdminuserComponent } from './components/adminuser/adminuser.component';
import { SerchbookComponent } from './components/serchbook/serchbook.component';
import { BooksComponent } from './components/books/books.component';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'conf', component: ConfComponent},
  {path:'adjustment', component: AdjustmentComponent, canActivate:[AuthGuard]},
  {path:'adminpage', component: AdminpageComponent, canActivate:[AuthAdmin]},
  {path:'adminuser', component: AdminuserComponent, canActivate:[AuthAdmin]},
  {path:'searchbook', component: SerchbookComponent, canActivate:[AuthGuard]},
  {path:'books', component: BooksComponent, canActivate:[AuthGuard]},

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    ConfComponent,
    AdjustmentComponent,
    AdminpageComponent,
    AdminuserComponent,
    SerchbookComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, AuthAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
