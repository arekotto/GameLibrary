import { v4 as uuidv4 } from 'uuid';

export class Game {
    id: string
    title: string
    publisher: string
    developer: string

    constructor(title: string, publisher: string, developer: string, id?: string) {
        this.id = id != null ? id : uuidv4()
        this.title = title
        this.publisher = publisher
        this.developer = developer
    }
}