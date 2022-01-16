import { Game } from "./Game";
import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string
    email: string
    name: string
    library: Game[]

    constructor(email: string, name: string, library: Game[], id?: string) {
        this.id = id != null ? id : uuidv4()
        this.email = email
        this.name = name 
        this.library = library
    }

    isValid(): boolean {
        return this.id != null 
        && this.email != null 
        && this.name != null
        && this.library != null
    }
}

export interface UserCreationData {
    email: string
    name: string
}