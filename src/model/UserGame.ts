
export class UserGame {
    id: string
    title: string
    publisher: string
    developer: string
    dateAdded: Date

    constructor(id: string, title: string, publisher: string, developer: string, dateAdded: Date = new Date()) {
        this.id = id
        this.title = title
        this.publisher = publisher
        this.developer = developer
        this.dateAdded = dateAdded
    }
}