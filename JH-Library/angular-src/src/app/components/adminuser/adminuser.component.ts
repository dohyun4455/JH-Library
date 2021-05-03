import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {

  user:Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.finduser().subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

  remove(id) {

    const user = {_id: id}
    this.authService.userremove(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('User Delete Complete', {cssClass: 'alert-success', timeout: 3000});
        location.reload(true); // 새로고침
      }
      else this.flashMessage.show('User Remove Fail', {cssClass: 'alert-danger', timeout: 3000});
    })
  }



}
