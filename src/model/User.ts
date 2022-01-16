import { Game } from "./Game";
import { v4 as uuidv4 } from 'uuid';
import { UserGame } from "./UserGame";

export class User {
    id: string
    email: string
    name: string
    dateCreated: Date
    library: UserGame[]

    constructor(email: string, name: string, library: UserGame[], id: string = uuidv4(), dateCreated: Date = new Date() ) {
        this.id = id
        this.email = email
        this.name = name 
        this.library = library
        this.dateCreated = dateCreated
    }

    ownsGame(id: string): boolean {
        return this.library.findIndex(game => game.id == id) != -1
    }

    addGameToLibrary(game: Game) {
        this.library.push(new UserGame(game.id, game.title, game.publisher, game.developer))
    }
}