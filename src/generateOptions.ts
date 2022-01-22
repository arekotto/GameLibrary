import { generateRoutes, generateSpec, ExtendedRoutesConfig, ExtendedSpecConfig } from "tsoa"

export async function generateOptions() {
    const specOptions: ExtendedSpecConfig = {
        basePath: "/api",
        entryFile: "./api/server.ts",
        specVersion: 3,
        outputDirectory: "./api/dist",
        controllerPathGlobs: ["./src/controllers/**/*Controller.ts"],
        noImplicitAdditionalProperties: 'throw-on-extras'
    }

    const routeOptions: ExtendedRoutesConfig = {
        basePath: "/api",
        entryFile: "./api/server.ts",
        routesDir: "./api",
        noImplicitAdditionalProperties: 'throw-on-extras'
    }

    await generateSpec(specOptions)
    await generateRoutes(routeOptions)
}

