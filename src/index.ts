import express from 'express'
import { DataBase } from './DataBase'
import { Game, GameData } from './Game'

const app  = express()
app.use(express.json())

const port = 8080
const db = new DataBase()
db.setExampleLibrary()

app.listen(port, () => {
    console.log("The application is listening on port: " + port)
})

app.get('/', (req, res) => {
    res.end("Welcome to the game store!")
})

app.get('/library', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(db.getGames()))
})

app.get('/library/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const game = db.getGame(req.params.id)
    res.end(JSON.stringify(game))
})

app.post('/library/add', (req, res) => {
    // const game: GameData = JSON.parse(req.body)
    // const jsonObj = res.json({requestBody: req.body}) 
    const game: GameData = req.body as GameData
    db.addGame(game)
    res.end("OK")
})

app.post('/library/reset', (req, res) => {
    db.setExampleLibrary()
    res.end("OK")
})
