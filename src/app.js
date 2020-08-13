const path = require('path');
const express = require('express');
const hbs  = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()


//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')    
const viewsPath = path.join(__dirname, '../templates/views')  
const partialsPath = path.join(__dirname, '../templates/partials') 

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Rahul Ajith' ,
        pageTitle: 'Weather'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Rahul Ajith' ,
        pageTitle: 'About'
    })
})


app.get('/help', (req,res) => {
    res.render('help',{
        name: 'Rahul Ajith',
        title: 'Help',
       helpText: 'This is some helpful text' ,
       pageTitle: 'Help'
    })
})


app.get('/weather', (req, res)=> {

   if(!req.query.address){
     return  res.send({
           error: 'You must provide an address!'
       })
   }
    geocode(req.query.address, (error, {latitude, longitude,location}={}) =>{

        if(error){
           return res.send({error})
           
        } forecast(latitude, longitude, (error, {temperature, humidity}) => {
            if(error){
               return res.send({error})
            }
            res.send({
                location,
                forecast: `It is currently ${temperature} degress out. There is a ${humidity}% chance of rain`,
                address: req.query.address
            }) 
      })
    })
})
   
 


app.get('/help/*' , (req, res) => {
    res.render('404',{
        title:'404',
        name:'Rahul Ajith',
       errorMessage: 'Help article not found',
       pageTitle: '404'
    })
})


app.get('*' , (req, res) => {
    res.render('404',{
        title:'404',
        name:'Rahul Ajith',
       errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and runnung on port 3000!');
    
})



