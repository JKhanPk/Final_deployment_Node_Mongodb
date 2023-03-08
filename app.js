const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const app = express();



const url = require('url');
var adr = '';
var q = url.parse(adr, true);

const {getdate , age} = require(__dirname + '/datess.js');

//mongoose.connect('mongodb://localhost:27017/todolist_v1');

mongoose.connect('mongodb+srv://Jhanzeb_admin:Helloworld12.@cluster0.zalrziy.mongodb.net/todolist_v1');



const mongooitemSchema = new mongoose.Schema({
  name: String
});


const mongooitem =  mongoose.model('mongooitem', mongooitemSchema);

const mongooitem1 = new mongooitem({name: 'Book'});
const mongooitem2 = new mongooitem({name: 'Lamp'});
const mongooitem3 = new mongooitem({name: 'Chocolate'});

let mongooarr= [mongooitem1,mongooitem2,mongooitem3];


let mongooarr1 = [];

const list1Schema =  {
  name: String,
  items:[mongooitemSchema]
};

const list1 = mongoose.model('list1',list1Schema);

//const router = express.Router();

const week =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const month = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
//const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
app.set('view engine', 'ejs');
let dates = getdate();
let agess = age();
//var today = new Date();
//var dates = today.toLocaleDateString('en-US', options);
//var enterdata = ['Foods','Drinks','Snacks'];
var enterdata1=[];
//var catchword1=''

var k = enterdata1.length;
var j = mongooarr.length;
//let postword = "";
// let id11 ="";

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(bodyparser.json());


app.get('/', function(req, res) {


    mongooitem.find({}, function (err, founditems) {
       if(err)
       {
         console.log(err);
       }
       else
      {
      if (founditems.length==0)
      {
    //  console.log(founditems.length);
      mongooitem.insertMany(mongooarr, function() {
      console.log('items added successfully');
      res.redirect('/');
     });

    }
     else
     {
       res.render('list', {data: dates, newitem:founditems, ages: agess });
      }
    }
  });
});

//app.get('/about',function(req,res){
  //res.render('about');
//})



app.get('/:id11', function(req, res) {


  let recieve =   req.originalUrl;
   recieve = recieve.replace(/^\/|\/$/g, '');
//  let recieve1 = recieve.replace(/\/$/, "")
   //req.protocol + '://' + req.get('host') + req.originalUrl;
   //console.log(recieve);
     recieve= _.capitalize(recieve);
     if ( recieve!='Favicon.ico' && recieve!='About')
     {

      list1.findOne({ name: recieve }, function (err, foundllist) {
      if (!err)
      {
      if(!foundllist)
        {
          const listt1 = new list1({
          name: recieve,
          items: mongooarr1
        });

          console.log(recieve+" is just added as new list to the database collection");
          listt1.save();
          res.render('list', {data: listt1.name , newitem:listt1.items , ages: agess });
        }
        else
              {    //console.log("This list already exist in database");
                   res.render('list', {data: foundllist.name , newitem:foundllist.items , ages: agess });
              }
      }
      else
      {
        console.log(err);
      }

      });
    }

    else
    {
              res.render('about');

    }



       //  res.render('list', {data: dates, newitem: enterdata, ages: agess });
      /*  mongooitem.find({}, function (err, founditems) {
           if(err)
           {
             console.log(err);
           }
           else{
          if (founditems.length===0)
          {
        //  console.log(founditems.length);
          mongooitem.insertMany(mongooarr, function() {
          console.log('items added successfully');
         });
        res.redirect('/');
        }
         else
         {
           res.render('list', {data: dates, newitem:founditems, ages: agess });
          }
        }
      });*/
       //console.log(mongooarr);

              //  res.render('list', {data: recieve, newitem:mongooarr, ages: agess });
      });

            //  res.render('list', {data: {da1: week[daynum] , da2:month[monthnum]} });
    //  res.render('list', {da2: day});
    //  res.render('list', {da3: month});
  //  res.send('today is Monday');
  //}
//  else
//  {
  //  res.sendFile(__dirname +'/index.html');
  //  res.write( '<h1 style= color:red;> Enjoy your weekend and its</h1>' +week[daynum] )
    //res.write('Hello Pakistan');
  //  res.send();
//  }
    //use res.send for a single message

/*
app.get('/work', function(req, res) {
   catchword1 = req.url;
   catchword1= catchword1.replace('/', "")
   res.render('list', {data: "New Work List", newitem: enterdata1, ages: agess});
  //catchword1 = req.body.data;
});
*/


app.post('/',function(req,res){

//catchword1 =catchword1.replace(/^\/|\/$/g, '');
let postword = req.body.newitem;
let data12 = req.body.listy;
//console.log(postword);
console.log(data12);
const newpostword =  new mongooitem({name: postword});
//const newpostword1 =  new list1({name: postword});
console.log(newpostword);
if(data12===dates)
{
newpostword.save();
res.redirect('/');
}
else
{
        list1.findOne({ name: data12 }, function (err,foundllist) {
        if(!err)
        {
        foundllist.items.push(newpostword);
        foundllist.save();
        res.redirect('/'+data12);
      }
      else
      {
        console.log(err);
      }
  });

}

});


app.post('/delete',function(req,res){
  let data123 = req.body.listy1;
  let id1 = req.body.checkbox1;
  console.log(id1);
  console.log(data123);
  //const myElement = id1.name;
  //console.log(myElement);
       if (data123==dates)
       {
             mongooitem.findByIdAndRemove(id1, function(err) {
               if (!err)
               {
                console.log("user removed");
                res.redirect("/");
               }


               });

   }
   else
         {
           list1.findOneAndUpdate({ name:data123 }, {$pull: { items:{  _id: id1}}},  function(err,foundllist) {

                  if (!err)
                  {foundllist.save();
                   res.redirect('/'+data123);
                   }
                 else
                 {
                   console.log(err);
                 }
           }      );
              //  res.redirect("/"+data123);
         }
    });

//mongooarr.splice(cell)
  //mongooarr= mongooarr.pull(cell);
  //res.render('list', {data: dates, newitem: mongooarr, ages: agess});
  //res.redirect('/');

/*
app.post('/delete',function(req,res){

const newitemz = req.body.checkBox;
console.log(newitemz);

//res.redirect('/');

});*/
app.listen(3000, function() {
  console.log('server started at 3000')
});

/*<input type="text"  name="fname" placeholder ="Type here" autocomplete="off">
<button type="submit" name="button" style="float: right" value= <%= data1 %> >+</button>*/
//          <button type="submit"  style="float: left" >-</button>
