import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-serchbook',
  templateUrl: './serchbook.component.html',
  styleUrls: ['./serchbook.component.css']
})
export class SerchbookComponent implements OnInit {

  book: Object;
  Fcheck: true;
  page = 1;
  page2: number;
  page3: number;
  search: String;
  pagecheck: number;
  currentpage = 1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.currentpage = this.authService.currentPage(0,"inc");
    if (this.pagecheck == null) this.pagecheck = 1;
    var bookinfo = this.authService.loadBookInfo();
    var pageinfo = this.authService.loadPage();
    if (pageinfo == null) pageinfo = "1";
    var next = this.authService.nextpreviousPage(0,"inc") * 3;
    this.page += next;
    this.page2 = this.page + 1;
    this.page3 = this.page + 2;
    this.pagecheck = parseInt(pageinfo);
    this.authService.searchbook(bookinfo, pageinfo).subscribe(data => {
      console.log(data);
      this.book = data.items;
    })

  }

  pg(i) {
    var next = this.authService.nextpreviousPage(0,"inc") * 3;
    var page = this.authService.currentPage(0,"inc");
    var check = i + next;
    if (page < check) {
      var p2 = page + 2;
      if(p2 == check) {
        this.authService.currentPage(2,"inc");
        this.pagecheck = 3;
      }
      else {
        this.authService.currentPage(1,"inc");
        this.pagecheck = 2;
      }
    }
    else if (page > check) {
      var p2 = page - 2;
      if(p2 == check) {
        this.authService.currentPage(2,"dec");
        this.pagecheck = 1;
      }
      else {
        this.authService.currentPage(1,"dec");
        this.pagecheck = 2;
      }
    }
    this.authService.storePageInfo(this.authService.currentPage(0,"inc"));
    console.log("next page = " + this.authService.currentPage(0,"inc"));
    location.reload(true);

  }



  Searching() {
    const keywordinputElement: HTMLInputElement = document.getElementById('keyword') as HTMLInputElement
    const keyword: string = keywordinputElement.value
    const sortinputElement: HTMLInputElement = document.getElementById('sort') as HTMLInputElement
    const sort: string = sortinputElement.value

    var info = {
      search:this.search,
      keyword:keyword,
      sort:sort
    }
    this.authService.storeBookInfo(info);
    this.authService.storePageInfo(this.currentpage);
    location.reload(true);
  }

  nextpage() {
    this.authService.storePageInfo(this.authService.currentPage(3,"inc"));
    this.authService.nextpreviousPage(1,"inc");
    location.reload(true);
  }

  prepage() {
    this.authService.storePageInfo(this.authService.currentPage(3,"dec"));
    this.authService.nextpreviousPage(1,"dec");
    location.reload(true);
  }

  valid(book) {
    console.log(book.isbn);

    this.authService.validbook(book).subscribe(data => {
      if(data != null) {
        this.flashMessage.show('Already exist book', {cssClass: 'alert-danger', timeout: 3000});
      } else {
        this.flashMessage.show('Request Success', {cssClass: 'alert-success', timeout: 3000});
      }
    });

  }

}
