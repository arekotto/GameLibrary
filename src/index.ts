import express, { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import library from "./routes/library"
import bodyParser from "body-parser";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { generateOptions } from './generateOptions';
import { ValidateError } from "tsoa";
import ApiError from "./ApiError";

generateOptions()

const app  = express()
app.use(express.json())

const port = 8080

app.use("/library", library)

app.get('/', (req, res) => {
    res.end("Welcome to the game store!")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")))
});

RegisterRoutes(app);

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        })
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
        })
    }

    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }

    next()
})

app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
        message: "Not Found",
    })
})

app.listen(port, () => {
    console.log("The application is listening on port: " + port)
})
