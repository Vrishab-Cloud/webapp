# Command

**1) Initialize npm**

**2) Install required package**

    npm i -D nodemon

    npm i express dotenv body-parser

    npm i sequelize mysql2

    npm i -D sequelize-cli

(Note: `sequelize-cli` generates files and folders. Also run npx sequelize-cli init) 

**4) Add neccessary files to the project (.env and .gitignore)**

(Note: Create variables in .env file)

**5) Change config.json to config.js** 

config.js has connection setup for different phase
Export the module and use the .env variables.

Also change the path in model/index.js using this file

**6) Update your package.json file and add start command under script**

    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node index.js",
      "dev": "nodemon index.js"
    },

**7) Create Node, express server, routes, and controllers**


# Reference

[Express](https://expressjs.com/en/4x/api)

[Sequelize](https://sequelize.org/docs/v6/)
