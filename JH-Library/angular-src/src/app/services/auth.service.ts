import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  page = 1;
  npcheck = 0;

  constructor(private http: Http) {
      }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/profile');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    const bookinfo = {
      keyword: "title",
      sort: "sim",
      search: "자바"
    };
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userid', user.id);
    localStorage.setItem('bookinfo', JSON.stringify(bookinfo));
    localStorage.setItem('currpage', "1");
    localStorage.setItem('nppage', "0");
    localStorage.setItem('mynameis', user.name);
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  prepEndpoint(ep){
    //return 'http://localhost:8080/'+ep;
    return 'http://46.101.84.253:8080/'+ep;
  }

  snslogin() {
    let ep = this.prepEndpoint('auth/conf');
    return this.http.get(ep)
      .map(res => res.json());
  }

  adjustmentUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/adjustment');
    return this.http.post(ep, user, {headers: headers})
      .map(res => res.json());
  }

  admincheck() {
    if (localStorage.getItem('userid') != null){
      let ad;
      ad = localStorage.getItem('userid');
      if (ad == "5be91972ffad3bb8601deb9b"){
        return true;
      }
      else return false;
    }
    else return false;

  }

  finduser() {
    let ep = this.prepEndpoint('users/adminuser');
    return this.http.get(ep)
      .map(res => res.json());
  }

  userremove(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/userremove');
    return this.http.post(ep, user, {headers: headers})
      .map(res => res.json());
  }

  searchbook(book, page) {
    var info = {
      book: book,
      page: page
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/searchbook');
    return this.http.post(ep, info, {headers: headers})
      .map(res => res.json());
  }

  storeBookInfo(info) {
    localStorage.setItem('bookinfo', JSON.stringify(info));
  }

  storePageInfo(info) {
    localStorage.setItem('pageinfo',info);
  }

  loadBookInfo(){
    var info = localStorage.getItem('bookinfo');
    info = JSON.parse(info);
    return info;
  }

  loadPage() {
    var page = localStorage.getItem('pageinfo');
    return page;
  }

  currentPage(check, decinc) {
    var page = localStorage.getItem('currpage');
    var pages = parseInt(page);
    if (decinc == "dec") pages -= check;
    else pages += check;
    localStorage.setItem('currpage', String(pages));
    return pages;
  }

  nextpreviousPage(check, decinc) {
    var page = localStorage.getItem('nppage');
    var pages = parseInt(page);
    if (decinc == "dec") pages -= check;
    else pages += check;
    localStorage.setItem('nppage', String(pages));
    return pages;
  }

  findbook() {
    let ep = this.prepEndpoint('book/findbook');
    return this.http.get(ep)
      .map(res => res.json());
  }

  validbook(book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/validbook');
    return this.http.post(ep, book, {headers: headers})
      .map(res => res.json());
  }

  searchbook2(book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/searchbook2');
    return this.http.post(ep, book, {headers: headers})
      .map(res => res.json());
  }

  whoru() {
    var user = localStorage.getItem('mynameis');
    return user;
  }

  borrowbook(book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/borrow');
    return this.http.post(ep, book, {headers: headers})
      .map(res => res.json());
  }

  whatiborrow(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/mybook');
    return this.http.post(ep, user, {headers: headers})
      .map(res => res.json());
  }

  bookreturn(book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/bookreturn');
    return this.http.post(ep, book, {headers: headers})
      .map(res => res.json());
  }

  bookremove(book){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('book/bookremove');
    return this.http.post(ep, book, {headers: headers})
      .map(res => res.json());
  }

}
