const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')//configure the view wngine og the express



app.use((req,res,next)=>{
  var now = Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',()=>{});
  next();//if not then cannot move to next middleware
})

// app.use((req,res,next)=>{
//   res.render('maintainence.hbs')
// })

//for MIDDLEWAREuse :use(oneArgOnly):-
app.use(express.static(__dirname+'/public'));//the wrapper function
//up: serves the directory 'public'

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})


app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name:'kk',
    likes:[
      'chess',
      'novel'*/
    res.render('home.hbs',{
      pageTitle: 'Home Page',
      //currentYear: new Date().getFullYear(),
      welcomeMessage : 'Hi! long time No see.'

  })
})

app.get('/about',(req,res)=>{
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear(),
    welcomeMessage : 'Hi.only.'
  })
})
app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle:"Project Lies Here",
    welcomeMessage:"You are on your own :0"
  })
  })


app.get('/bad',(req,res)=>{
  res.send({
    somethingHapnd: 'error'
  })
})

app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
