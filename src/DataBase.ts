import { Game, GameData } from "./Game";
import { v4 as uuidv4 } from 'uuid';

export class DataBase {
    private library: Map<string, Game> = new Map()

    setExampleLibrary() {
        this.library = new Map()
        this.addGame({ title: "God of War", publisher: "Sony", developer: "Santa Monica Studio" })
        this.addGame({ title: "Last of Us", publisher: "Sony", developer: "Noughty Dog" })
        this.addGame({ title: "The Witcher 3", publisher: "CD Project Red", developer: "CD Project Red" })
        this.addGame({ title: "Call of Duty: Modern Warfare", publisher: "Activision", developer: "Noughty Dog" })
        this.addGame({ title: "Star Wars Jedi: Fallen Order", publisher: "Electronic Arts", developer: "Respawn Entertainment" })
    }

    addGame(gameData: GameData) {
        const game: Game = { id: uuidv4(), title: gameData.title, publisher: gameData.publisher, developer: gameData.developer }
        this.library.set(game.id, game)
    }

    getGame(id: string): Game | undefined {
        return this.library.get(id)
    }

    getGames(): Game[] {
        return [ ...this.library.values() ]
    }
}
