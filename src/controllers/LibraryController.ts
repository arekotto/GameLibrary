import { Request, Response } from "express";
import { DataBase } from "../DataBase";
import { GameData } from "../Game";

class LibraryController {
    private static db = LibraryController.makeDB()

    static getAll = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(LibraryController.db.getGames()))
    }

    static getOneById = async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        const game = LibraryController.db.getGame(req.params.id)
        res.end(JSON.stringify(game))
    }

    static add = async (req: Request, res: Response) => {
        const game: GameData = req.body as GameData
        LibraryController.db.addGame(game)
        res.end("OK")
    }

    static reset = async (req: Request, res: Response) => {
        LibraryController.db.setExampleLibrary()
        console.log("reset")
        res.end("OK")
    }

    private static makeDB(): DataBase {
        const db = new DataBase()
        db.setExampleLibrary()
        return db
    }
}

export default LibraryController