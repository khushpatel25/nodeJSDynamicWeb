const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./db/conn')
const user = require('./models/collection')

const app = express()
const port = 1000 || process.env.PORT

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/contact', async (req, res) => {
    try {

        const userDoc = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })

        const result = await userDoc.save()

        res.status(201).render('index')

    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log(`listening to the port ${port}`)
})