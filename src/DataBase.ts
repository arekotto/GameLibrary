import { Game, GameData } from "./model/Game";
import { v4 as uuidv4 } from 'uuid';

export interface Identifiable {
    id: string
}

export class DataBase<T extends Identifiable> {
    private library: Map<string, T> = new Map()

    getObject(id: string): T | undefined {
        return this.library.get(id)
    }

    getAll(): T[] {
        return [ ...this.library.values() ]
    }

    upsertObject(obj: T) {
        this.library.set(obj.id, obj)
    }

    removeAll() {
        this.library = new Map()
    }
}

export class GameDataBase extends DataBase<Game> {
    setExampleLibrary() {
        this.removeAll()
        this.upsertObject(new Game("God of War", "Sony", "Santa Monica Studio" ))
        this.upsertObject(new Game("Last of Us", "Sony", "Noughty Dog" ))
        this.upsertObject(new Game("The Witcher 3", "CD Project Red", "CD Project Red"))
        this.upsertObject(new Game("Call of Duty: Modern Warfare", "Activision", "Noughty Dog"))
        this.upsertObject(new Game("Star Wars Jedi: Fallen Order", "Electronic Arts", "Respawn Entertainment"))
    }
}