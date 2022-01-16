import { GameDataBase, UserDataBase } from "../DataBase"
import { User } from "../model/User"
import { Body, Controller, Get, Path, Post, Delete, Query, Route, SuccessResponse, Response, Tags } from "tsoa"
import ApiError from "../ApiError"
import { UserCreationData } from "../model/UserCreationData"

@Route("user")
@Tags("User")
export class UserController extends Controller {
    private static userDB = UserDataBase.sharedDB
    private static gameDB = GameDataBase.sharedDB

    @Get()
    async getAll(): Promise<User[]> {
        return UserController.userDB.getAll()
    }

    @Response<ApiError>(409, "UserNotFound")
    @Get("{userId}")
    async getOneById(@Path() userId: string): Promise<User> {
        const user = UserController.userDB.getObject(userId)
        if (user == null) {
            throw new ApiError("UserNotFound", 404, "User not found.")
        }
        return user
    }

    @Response<ApiError>(409, "UserAlreadyExists")
    @SuccessResponse(201, "Created")
    @Post("addTest")
    async addTestUser(): Promise<User> {
        return this.addNewUser({ email: "test@test.com", name: "Test User" }, "35e2d8c8-aa8f-4ffc-9770-f1d49817d4d9")
    }

    @Response<ApiError>(409, "UserAlreadyExists")
    @SuccessResponse(201, "Created")
    @Post("add")
    async add(@Body() creationData: UserCreationData): Promise<User> {
        return this.addNewUser(creationData)
    }

    @Response<ApiError>(404, "UserNotFound")
    @Response<ApiError>(400, "GameNotFound")
    @Response<ApiError>(409, "GameAlreadyOwned")
    @SuccessResponse(201, "Created")
    @Post("{userId}/addGame")
    async addGame(@Path() userId: string, @Query() gameId: string): Promise<void> {

        const user = UserController.userDB.getObject(userId)
        if (user == undefined) {
            throw new ApiError("UserNotFound", 404, "User does not exist.")
        }

        const game = UserController.gameDB.getObject(gameId)
        if (game == undefined) {
            throw new ApiError("GameNotFound", 400, "Game does not exist.")
        }

        if (user.ownsGame(game.id)) {
            throw new ApiError("GameAlreadyOwned", 409, "This user already owns this game.")
        }

        user.addGameToLibrary(game)
        UserController.userDB.upsertObject(user)
        this.setStatus(201)
    }

    @Response<ApiError>(404, "UserNotFound")
    @Response<ApiError>(409, "GameNotOwned")
    @SuccessResponse(204, "Removed")
    @Delete("{userId}/removeGame")
    async removeGame(@Path() userId: string, @Query() gameId: string): Promise<void> {

        const user = UserController.userDB.getObject(userId)
        if (user == undefined) {
            throw new ApiError("UserNotFound", 404, "User does not exist.")
        }

        const removedGameIndex = user.library.findIndex(game => game.id == gameId)
        if (removedGameIndex == -1) {
            throw new ApiError("GameNotOwned", 404, "User does not own this game.")
        }

        user.library.splice(removedGameIndex, 1)
        UserController.userDB.upsertObject(user)
        this.setStatus(204)
    }

    private async addNewUser(creationData: UserCreationData, suggestedId?: string): Promise<User> {
        console.log(creationData.email)
        const user = new User(creationData.email, creationData.name, [], suggestedId)

        const isEmailTaken = UserController.userDB.getUser(user.email) != undefined
        if (isEmailTaken) {
            throw new ApiError("UserAlreadyExists", 409, "User already exists.")
        }

        UserController.userDB.upsertObject(user)
        this.setStatus(201)
        return user
    }
}