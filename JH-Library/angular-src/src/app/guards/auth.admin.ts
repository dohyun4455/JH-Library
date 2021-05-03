import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthAdmin implements CanActivate {
  constructor (
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService){

  }

  canActivate() {
    if(this.authService.admincheck()) {
      return true;
    }
    else {
      this.router.navigate(['/profile']);
      this.flashMessage.show('You are not Admin', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  }
}
