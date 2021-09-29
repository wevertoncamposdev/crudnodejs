const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');//
const app = express();
const urlencodeParser = bodyParser.urlencoded({extended: false});

//connect sql
const sql = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password:'19120705', 
    port: 3306,
});

//chamar o banco de dados que será usado
sql.query("use nodejs");

//Template engine
app.engine("handlebars",handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));

//routes and Templates
app.get('/', (req, res) => {res.render('index')})

app.get("/javascript", (req, res)=>{res.sendFile(__dirname+'/js/javascript.js')})

app.get("/style", (req, res)=>{res.sendFile(__dirname+'/css/style.css')})


//CRUD
app.get("/create", (req, res)=>{res.render("create")})

app.get("/select/:id?", (req, res)=>{
    if(!req.params.id){

        sql.query('select * from user order by id asc', (err, results, fields)=>{
            res.render("select", {data: results})
        })

    }else{

        sql.query('select * from user where id = ? order by id asc', [req.params.id], (err, results, fields)=>{
            res.render("select", {data: results})
        })

    }
    
})

app.post("/controllerForm", urlencodeParser, (req, res)=>{
   sql.query('insert into user values(?,?,?)', [req.body.id, req.body.name, req.body.age,])
   res.render('controllerForm', {name: req.body.name})
})

//init server
app.listen(3000, (req, res) => {console.log('Server running')});