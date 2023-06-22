const express = require('express');
const app = express(); 
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
// Require A file from utils
// const {getDate} = require('./utils/mantra')

// MiddleWare
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));
// Menghubungkan ke databese MONGODB
require('./hubDB/db');

// Schema Itemms
const {Item, Home} = require('./modelDB/newItem')


// Halaman Home
app.get('/', async (req,res) => {
   const dataCollect = await Home.find()
    res.render("home", {layout : 'layouts/main', tittle: 'Home', dataCollect})
});

// Halaman TodoList
app.get('/todolist', async (req,res) => {
    
    const dataJson = await Item.find();
       res.render("todolist", {
        layout : 'layouts/main',
       tittle : 'Work',
         dataJson})
   });


// Menambahkan Data HOME
app.post('/', (req,res) => { 
      Home.insertMany(req.body).then(() => console.log('Successfully entered data TodoList HOME'));
      res.redirect('/')
     });

// Delete Data HOME
app.delete('/', (req,res) => { 

      Home.deleteOne({ homeItem : req.body.homeItem}).then(() => console.log('Successfully deleted data TodoList HOME'));
      res.redirect('/');
      });
     

// Menambahkan Data WORK
app.post('/todolist', (req,res) => { 
    Item.insertMany(req.body).then(() => console.log('Successfully entered data TodoList WORK'))
    res.redirect('/todolist');
   });


      // Menghapus Data WORK
app.delete('/todolist', (req,res) => { 
   // deleteItem(req.params.item);
   Item.deleteOne({ newItem : req.body.newItem}).then(() => console.log('Successfully deleted data TodoList WORK'));
   res.redirect('/todolist')
  

});

app.listen(3000, () => {
console.log('Server listenig in port 3000');
});
