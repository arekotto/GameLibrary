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
        this.upsertObject(new Game("God of War", "Sony", "Santa Monica Studio", "35e2d8c8-aa8f-4ffc-9770-f1d49817d4d9"))
        this.upsertObject(new Game("Last of Us", "Sony", "Noughty Dog", "5b2dc89c-cf02-4cb4-9017-8123f2de67d9" ))
        this.upsertObject(new Game("The Witcher 3", "CD Project Red", "CD Project Red", "2d8f5299-6a17-4faa-b2c5-12db47f1d37b"),)
        this.upsertObject(new Game("Call of Duty: Modern Warfare", "Activision", "Noughty Dog", "644afd16-f233-4764-b4d5-21f615dedf87"))
        this.upsertObject(new Game("Star Wars Jedi: Fallen Order", "Electronic Arts", "Respawn Entertainment", "a5ea9685-c388-4ffa-b880-7e0a4532eb58"))
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