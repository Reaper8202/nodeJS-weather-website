const path = require('path')
const express = require('express')
const { application } = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public/help.html')))
app.use(express.static(path.join(__dirname, '../public/about.html')))


//Setup handlebars engine and views location
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Derek'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Derek'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Derek'
    }) 
})

app.get('/help*', (req,res)=> {
    res.render('My404page', {
        title: 'Help Page Not Found',
        name: 'Derek'
    })
})

app.set('view engine', 'hbs')


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude} = {})=> {
        if (error){
            return res.send({error})
        }
        else {
            forecast(latitude,longitude,(error, forecastData)=> {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    foreacst: forecastData,
                    //Couldn't figure out why it didn't work for location object
                    address: req.query.address
                })
            })
        }
    })
})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        produts: []
    })
})
app.get('*', (req,res)=> {
    res.render('My404page', {
        title: 'Page Not Found',
        name: 'Derek'
    })
})
app.get('/help/*', (req, res)=>{
    res.send("Help article not found")
})


app.listen(port, ()=>{
    console.log("Server is up on port "+port)
})