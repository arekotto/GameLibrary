import { Game, GameData } from "./model/Game";
import { v4 as uuidv4 } from 'uuid';
import { User } from "./model/User";

export interface Identifiable {
    id: string
}

export class DataBase<T extends Identifiable> {
    private objects: Map<string, T> = new Map()

    getObject(id: string): T | undefined {
        return this.objects.get(id)
    }

    getAll(): T[] {
        return [ ...this.objects.values() ]
    }

    upsertObject(obj: T) {
        this.objects.set(obj.id, obj)
    }

    removeAll() {
        this.objects = new Map()
    }
}

export class GameDataBase extends DataBase<Game> {

    static sharedDB = GameDataBase.makeDB()

    setExampleLibrary() {
        this.removeAll()
        this.upsertObject(new Game("God of War", "Sony", "Santa Monica Studio" ))
        this.upsertObject(new Game("Last of Us", "Sony", "Noughty Dog" ))
        this.upsertObject(new Game("The Witcher 3", "CD Project Red", "CD Project Red"))
        this.upsertObject(new Game("Call of Duty: Modern Warfare", "Activision", "Noughty Dog"))
        this.upsertObject(new Game("Star Wars Jedi: Fallen Order", "Electronic Arts", "Respawn Entertainment"))
    }

    private static makeDB(): GameDataBase {
        const db = new GameDataBase()
        db.setExampleLibrary()
        return db
    }
}

export class UserDataBase extends DataBase<User> {
    
    static sharedDB = new UserDataBase()

    getUser(email: String): User | undefined {
        return this.getAll().filter(usr => usr.email == email)[0]
    }
}