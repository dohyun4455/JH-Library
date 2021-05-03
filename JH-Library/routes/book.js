const express = require('express');
const router = express.Router();
const Book = require('../models/book');

var client_id = 'zv4lfrsZDl7b9tLotuba';
var client_secret = 'bOResInZhN';

router.post('/searchbook', function (req, res, next) {
  console.log(req.body);
  var searchOption = {
    keyword: req.body.book.keyword,
    sort: "&sort=" + req.body.book.sort,
    search: req.body.book.search,
    page: "&start=" + req.body.page
  };

  if (searchOption.keyword == "all") searchOption.keyword = "";
  if (searchOption.keyword == "title") searchOption.keyword = "&d_title=" + encodeURI(searchOption.search);
  if (searchOption.keyword == "author") searchOption.keyword = "&d_auth=" + encodeURI(searchOption.search);
  if (searchOption.keyword == "publ") searchOption.keyword = "&d_publ=" + encodeURI(searchOption.search);

   var api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(searchOption.search) + searchOption.keyword + searchOption.page + '&display=10' + searchOption.sort; // json 결과
   console.log(api_url);
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });

 router.get('/findbook', function(req,res) {
     Book.find(function(err, books){
         if(err) return res.status(500).send({error: 'database failure'});
         res.json(books);
       });
 });

 router.post('/validbook', function(req, res) {
   let book = new Book ({
     image: req.body.image,
     title: req.body.title,
     author: req.body.author,
     isbn: req.body.isbn,
     borrow: "0",
     when: "0",
     when2: "0",
     description: req.body.description
   });
   console.log(book);
   Book.findOne({ isbn: req.body.isbn }, function(err, output){
     if(err) return res.status(500).json({success: false, error: "database failure" });
     res.json(output);
     if(output == null) {
       Book.addUser(book, (err, book) => {
         if(err) {
           console.log("err");
         } else {
           console.log("true");
         }
       });
     }
   });
 });

 router.post('/searchbook2', function (req, res, next) {
   console.log(req.body.search);
   var query = new RegExp(req.body.search);
   Book.find({$or: [{isbn: query}, {author: query}, {title: query}]}, function(err, output){
     if(err) return res.status(500).json({success: false, error: "database failure" });
     res.json(output);
     console.log(output);
   });

 });

 router.post('/borrow', (req, res, next) => {
   let book = new Book ({
     _id: req.body._id,
     borrow: req.body.user,
     when: req.body.when,
     when2: req.body.when2
   });

   Book.borrow(book, (err, book) => {
     if(err) {
       res.json({success: false});
     } else {
       res.json({success: true});
     }
   });
 });

 router.post('/mybook', (req, res, next) => {
   console.log(req.body.username);
   var user = req.body.username;
   Book.find({borrow: user}, function(err, output){
     if(err) return res.status(500).json({success: false, error: "database failure" });
     res.json(output);
     console.log(output);
   });
 });

 router.post('/bookreturn', (req, res, next) => {
   let book = new Book ({
     _id: req.body._id,
     when: "0",
     when2: "0",
     borrow: "0"
   });

   Book.returnbook(book, (err, book) => {
     if(err) {
       res.json({success: false});
     } else {
       res.json({success: true});
     }
   });
 });

 router.post('/bookremove',  function(req, res){
     Book.remove({ _id: req.body._id }, function(err, output){
         if(err) return res.status(500).json({success: false, error: "database failure" });
         res.json({success: true});
     })
 });


module.exports = router;
