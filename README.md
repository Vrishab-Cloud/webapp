# Command

**1) Initialize npm**

**2) Install required package**

    npm i express dotenv body-parser
     
    npm i bcrypt joi uuid 

    npm i sequelize mysql2

    npm i -D jest supertest
    
    npm i -D nodemon
    
    npm i -D sequelize-cli

(Note: The command `npm ci` can be used to install all the dependencies listed in the package.json)

**3) Add .env file to the project**

    DB_NAME=<database_name>
    DB_USER=<database_user>
    DB_PASS=<database_password>
    
    TEST_DB_NAME=<test_database_name>
    TEST_DB_USER=<test_database_user>
    TEST_DB_PASS=<test_database_password>


(Note: Create these variables in .env file)

**4) The package.json file contains few scripts**

    "scripts": {
      "test": "jest",
      "start": "node index.js",
      "dev": "nodemon index.js"
    },

# Reference

[Express](https://expressjs.com/en/4x/api)

[Sequelize](https://sequelize.org/docs/v6/)

[Jest](https://jestjs.io/docs/getting-started)

[SuperTest](https://www.npmjs.com/package/supertest)
