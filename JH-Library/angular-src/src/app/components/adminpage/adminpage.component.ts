import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  book:Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.findbook().subscribe(data => {
      this.book = data;
      console.log(data);
    })
  }

  returnbook(book){
    this.authService.bookreturn(book).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('Return Success', {cssClass: 'alert-success', timeout: 3000});
      location.reload(true);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    }
  });
  }

  removebook(book){
    this.authService.bookremove(book).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('Remove Success', {cssClass: 'alert-success', timeout: 3000});
      location.reload(true);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    }
  });
  }

  bookstatus(book){
    if(book.borrow != 0) return true;
    else return false;
  }

}
