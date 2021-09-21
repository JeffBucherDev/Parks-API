const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Parks-and-Hikes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('nationalparks').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addPark', (request, response) => {
    db.collection('nationalparks').insertOne({
        hikeName: request.body.hikeName.trim(), 
        parkName: request.body.parkName.trim(),
        parkState: request.body.parkState.trim(), 
        likes: 0
    })
    .then(result => {
        console.log('Park Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('nationalparks').updateOne({
        hikeName: request.body.hikeNameS, 
        parkName: request.body.parkNameS, 
        parkState: request.body.parkStateS, 
        likes: request.body.likesS
    },{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deletePark', (request, response) => {
    db.collection('nationalparks').deleteOne({
        hikeName: request.body.hikeNameS, 
        parkName: request.body.parkNameS
    })
    .then(result => {
        console.log('Park Deleted')
        response.json('Park Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})