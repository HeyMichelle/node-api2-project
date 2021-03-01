1. npm install
    a. run with npm start
    b. can change what you use to name start
2. npm install express --D  // to save to DevDependencies
3. npm run server // this is to run specifically nodemon for restarting automatically


4. Add to the | index.js | file the required info:
    
    const express = require("express")
    const db = require("../data/db")

    const server = express()
    const port = 2020

    server.use(express.json())

    server.get("/", (req, res) => {
	    res.json({
		    message: "Welcome to our API",
	    })
    })
    
    // Put on the last line
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })

5.  Create a route file "posts-router.js" and then import it to index.js
        in INDEX: const router = require("./posts/posts-router");


6.  in POSTS-ROUTER.JS Import express and the database, and create express.Router()

        This creates a stand alone mini express application that can morge with the main one in index.js. Change all the server

            const express = require("express")
            const db = require("../data/db.js")

            const router = express.Router()

7. Import CRUD operations but in this file, use "router" instead of "server", and export using router

    router.get("/", (req, res) =>{

    })
    //for :id
    router.get("/", (req, res) =>{
        
    })

    router.post("/", (req, res) =>{
        
    })

    router.put("/", (req, res) =>{
        
    })

    router.delete("/", (req, res) =>{
        
    })
    
    // at bottom
    module.exports = router



















    server.get("/api/users", (req, res) => {
  // gets a list of users from he "fake" database  
  // can also do the above with: const users = req.body;
    
  try {
    const users = db.getUsers();
    res.status(200).json(users); // correctly working, send users as json response
  } catch(err) {
    res
      .status(500)
      .json({ errorMessage: "The user's information could not be retrieved." });
  } // use try-catch blocks for 500 erros
});