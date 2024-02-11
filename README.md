# Command

**1) Initialize npm**

**2) Install required package**

    npm i express dotenv body-parser bcrypt joi uuid

    npm i sequelize mysql2 
    
    npm i -D nodemon
    
    npm i -D sequelize-cli

(Note: The command `npm ci` can be used to install all the dependencies listed in the package.json)

**4) Add neccessary files to the project (.env and .gitignore)**

    DB_NAME=<database_name>
    DB_USER=<database_user>
    DB_PASS=<database_password>
    
    TEST_DB_NAME=<test_database_name>
    TEST_DB_USER=<test_database_user>
    TEST_DB_PASS=<test_database_password>

    NODE_ENV=<Environemnt_type> ("development", "test" or "production")

(Note: Create these variables in .env file)

**5) The package.json file contains few scripts**

    "scripts": {
      "test": "jest",
      "start": "node index.js",
      "dev": "nodemon index.js"
    },

# Reference

[Express](https://expressjs.com/en/4x/api)

[Sequelize](https://sequelize.org/docs/v6/)

[Jest](https://jestjs.io/docs/getting-started)
