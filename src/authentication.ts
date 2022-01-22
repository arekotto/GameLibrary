import * as express from "express"

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    if (securityName === "api_key") {
        let token
        if (request.query && request.query.access_token) {
            token = request.query.access_token
        }

        if (token === "abc123456") {
            let demoAuthUser = { id: 1, name: "Ironman" }
            return Promise.resolve(demoAuthUser)
        } else {
            return Promise.reject({})
        }
    }

    if (securityName === "jwt") {
        return Promise.reject(new Error("Currently jwt is not implemented."))
    }
    return Promise.reject(new Error("No token provided"))
}