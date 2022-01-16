import { GameDataBase } from "../DataBase";
import { Game } from "../model/Game";
import { Body, Controller, Get, Path, Post, Delete, Query, Route, SuccessResponse, Response, Tags } from "tsoa"
import ApiError from "../ApiError"
import { GameCreationData } from "../model/GameCreationData";

@Route("library")
@Tags("Glogal Library")
export class LibraryController extends Controller {
    private static db = GameDataBase.sharedDB

    @Get()
    async getAll(): Promise<Game[]> {
        return LibraryController.db.getAll()
    }

    @Response<ApiError>(409, "GameNotFound")
    @Get("{gameId}")
    async getOneById(@Path() gameId: string): Promise<Game> {
        const game = LibraryController.db.getObject(gameId)
        if (game == null) {
            throw new ApiError("GameNotFound", 404, "Game not found.")
        }
        return game
    }

    @SuccessResponse(201, "Created")
    @Post("add")
    async add(@Body() creationData: GameCreationData): Promise<Game> {
        const game = new Game(creationData.title, creationData.publisher, creationData.developer)
        LibraryController.db.upsertObject(game)
        this.setStatus(201)
        return game
    }

    @Response<ApiError>(404, "GameNotFound")
    @SuccessResponse(204, "Removed")
    @Delete("remove")
    async removeGame(@Query() gameId: string): Promise<void> {

        const game = LibraryController.db.getObject(gameId)
        if (game == undefined) {
            throw new ApiError("GameNotFound", 404, "Game does not exist.")
        }

        LibraryController.db.removeObject(game.id)
        this.setStatus(204)
    }

    @SuccessResponse(204, "Removed")
    @Delete("reset")
    async reset(): Promise<void> {
        LibraryController.db.setExampleLibrary()
        console.log("reset")
        this.setStatus(201)
    }
}