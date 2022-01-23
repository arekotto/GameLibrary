# GameLibrary
A simple serverside app, which provides functionality of a game library. This app serves no particular purpose other than to gain some hands on experience with TypeScript, Node.js and Express.

# Setup
Run `npm install` to fetch all the node dependencies. After that, run `yarn build` to compile the source files into JavaScript. Finally, run `yarn start` to start up the server.

# Docs
By default the app uses `localhost:8080`. To see the list of endpoints available for the client open `http://localhost:8080/docs/`. This is an overview of the page:

<img width="1146" alt="Screen Shot 2022-01-23 at 10 21 30" src="https://user-images.githubusercontent.com/23309349/150672223-5e89437d-907d-4cff-9cd1-2552594ad958.png">

# Functionality Overview
The endpoints are divided into two categories. The first one are the ones that enable the client to browse the current list of available games, as well as to mange them by adding and removing entries. The second category consists of endpoints dedicated to managing users on the platform, which includes adding new users, removing existing ones and adding or removing games from their personal library. 

# Authentication
In order to access enpoints requiring authentication the request from the client should include a api key named `api_key` of value `abc123456`.
