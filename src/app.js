const path = require('path')         // path is a built-in module of nodejs
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//console.log(__dirname)   // showing the directory of the current file
//console.log(path.join(__dirname, '../public')) //show the public folder instead of src folder
//console.log(__filename)  // showing the directory and the file

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

/*
app.get('', (req, res) => {                // express.static call the special file in public folder so the app.get method here is ignored
    res.send('<h1>Weather</h1>')
})
*/


app.get('', (req, res) => {
    res.render('index', {           // index here have to match the name of the hbs file in views folder in which this render method affect it
        title: 'Weather App',
        name: 'Huy Nguyen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Huy Nguyen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg : 'this is help page of dynamic webpage',
        title: 'Help',
        name: 'Huy Nguyen'
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({error: 'You have to provide search term'}) // return to prevent the server give back 2 response from this res.send() and res.send() under
    }
    // or using else {}
    console.log(req.query.search)
    res.send({
        product: []
    })
})

/*                                          // remove the app.get() method and re-enter the help.html and about.html after creating them in public folder
app.get('/help', (req, res) => {            // if we use app.get, we dont need the separate html file in other folder
    res.send('help page')
})

app.get('/about', (req, res) => {
    res.send('<h2>About</h2>')
})
*/

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'You must provide an address'})
    } else { // using else or not is not important
        geocode(req.query.address, (error, {longitude, latitude, place} = {}) => {  // default parameters here help the function run even we set the wrong place so the right longitude and latitude can't be showed
            if(error){
                return res.send({error})
            } else { // feel free to remove else
                forecast(longitude, latitude, (error, dataforecast) => {
                    if(error){
                        return res.send({error})
                    } else { // feel free to remove else
                        return res.send({
                            address: req.query.address,
                            place,
                            forecast: dataforecast
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article not found',
        title: 'Help page 404 Error',
        name: 'Huy Nguyen'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'My 404 page',
        title: '404 Error',
        name: 'Huy Nguyen'
    })
})

/* // get * have to stay last because express will search from the first to the last of get function
app.get('/help/*', (req, res) => {
    res.send('help article not found!')
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})
*/


app.listen(3000, () => {                                // make the server up at port 3000
    console.log('Server is running on port 3000')
})