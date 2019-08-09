// This file contains the code for our application
// we need parser(middleware) to parse the body
const bodyParser = require('body-parser');
//we need request package
const request = require('request');
//yargs allows us to create variable or provide new value from command prompt
const argv = require('yargs').argv;
// To create HTTP server application, add express
const express = require('express')
// create an intance of the object named app of express module
const app = express()

// For API request use key
const apiKey = '68acc114ab0234821d9077183bb33db1';
// To use CSS file access to folder public
app.use(express.static('public'));
// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
// Use EJS to return HTML file on home page or root of the app
app.set('view engine', 'ejs')




// Pass URL and request returns callback function err, response, body
// app.get instance 
app.get('/', (req, res)=> {
  // instead of using res.send we use render when we work templating laguage
  res.render('index', {weather: null, error: null});
  })
  
  

// app put instance for the input city
app.post('/', (req, res)=> {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  request(url,(err,resp, body)=>{

    if(err) 
    {
      res.render('index',{weather:null, error: 'Error, Please try again'});
    }
    else {
        let weather= JSON.parse(body);
        if (weather.main==undefined) 
        {
          res.render('index',{weather:null, error: "Error, Please try again"});
    }
    else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
        
    }
    });
})

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!')
})
