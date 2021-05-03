import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  book:Object;
  search: String;
  searcheck = 0;

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

  Searching() {
    var info = {
      search:this.search,
    }
    this.authService.searchbook2(info).subscribe(data => {
      this.book = data;
      console.log(data);
    })
    this.searcheck = 1;
  }

  borrowcheck(book) {
    if (book.borrow != 0) {
      return true;
    }
    else {
      return false;
    }
  }

  borrow(book) {
    if (book.borrow != 0) {
      this.flashMessage.show('Already borrow book', {cssClass: 'alert-danger', timeout: 3000});
    }
    else {
      var user = this.authService.whoru();
      var timestamp = new Date();
      var year = timestamp.getFullYear();
      var month = timestamp.getMonth() + 1;
      var date = timestamp.getDate();

      timestamp.setDate(date + 7);
      var year2 = timestamp.getFullYear();
      var month2 = timestamp.getMonth() + 1;
      var date2 = timestamp.getDate();

      var bBook = {
        user: user,
        _id: book._id,
        when: year + "/" + month + "/" + date,
        when2: year2 + "/" + month2 + "/" + date2
      };
      this.authService.borrowbook(bBook).subscribe(data => {
        if (data.success == true) {
          this.flashMessage.show('Borrow Success', {cssClass: 'alert-success', timeout: 3000});
        }
      })
    }
}
}
