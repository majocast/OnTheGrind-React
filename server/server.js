const express = require('express');
const collection = require('./mongo');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//login code
app.get('/', cors(), (req, res) => {

})

app.post('/login', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const {email, password} = req.body;

  try {
    //searches the user in the database
    const check = await collection.findOne({email: email});
    if(check) {
      res.json("exists");
    }
    else {
      res.json("does not exist");
    }
  } catch (error) {
        res.json("does not exist");
  }
})

//registration code
app.post('/register', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const {email, password} = req.body;
  const data = {
    email: email,
    password: password
  }

  try {
    //searches the user in the database
    const check = await collection.findOne({email: email});
    if(check) {
      res.json("exists");
    }
    else {
      res.json("does not exist");
      await collection.insertMany([data]);
    }
  } catch (error) {
        res.json("does not exist");
  }
})

let PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})