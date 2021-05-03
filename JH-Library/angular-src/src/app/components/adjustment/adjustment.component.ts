import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent implements OnInit {
  user: Object;
  _id: String;
  name: String;
  email: String;
  phonenumber: String;
  address: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this._id = profile.user._id;
    },
     err => {
       console.log(err);
       return false;
     });
  }

  onAdjustmentSubmit() {
    const userset = {
      _id: this._id,
      name: this.name,
      email: this.email,
      phonenumber: this.phonenumber,
      address: this.address,
    }

    this.authService.adjustmentUser(userset).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('Adjustment Success', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/profile']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/adjustment']);
    }
  });
  }
}
