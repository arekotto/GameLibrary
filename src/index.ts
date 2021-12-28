import { Router} from 'express'
import express from 'express'
import library from "./routes/library"
import user from "./routes/user"

const app  = express()
app.use(express.json())

const port = 8080

app.use("/library", library)
app.use("/user", user)

app.get('/', (req, res) => {
    res.end("Welcome to the game store!")
})

app.listen(port, () => {
    console.log("The application is listening on port: " + port)
})
