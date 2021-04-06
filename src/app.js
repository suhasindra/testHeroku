const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('../utils/geocode')
const forecast = require('../utils/forecast')
const request = require('postman-request')

const { response } = require('express')
const app = express()
const dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(dir))
app.get('',(req, res)=>{
    res.render('index',{
        forecast: "Its raining",
        temperature: 28,
        name: "Gubal"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.render('weather', {
            error: "Error page",
            name: "You have to provide address"
        })
    }
    geocode(req.query.address, (error, {lat, long, place}={})=>{
        if(error) {
            return res.send({error})
        }

        forecast(lat, long, (error, forecastData)=> {
            if (error)
                return res.send({error})
        
            res.send({
                forecast: forecastData,
                place,
                address: req.query.address
            })
        })
    })
    
    // res.render('weather', {
    //     name: "Weather",
    //     forecast: "Its raining",
    //     location: "kulai",
    //     address: req.query.address
    // })
})

app.get('*',(req, res)=>{
    res.send('My 404 page')
})
const port = 3000
app.listen(port,() => {
    console.log('server started at port '+ port)
})