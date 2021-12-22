import { Router} from 'express'
import express from 'express'
import library from "./routes/library"

const app  = express()
app.use(express.json())

const port = 8080

app.use("/library", library)

app.get('/', (req, res) => {
    res.end("Welcome to the game store!")
})

app.listen(port, () => {
    console.log("The application is listening on port: " + port)
})
