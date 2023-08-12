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
  const {email, password, username} = req.body;

  try {
    //searches the user in the database
    const check = await collection.findOne({email: email});
    if(check) {
      //password is correct
      if(check.password === password) {
        res.json({status: "exists", username: check.username});
      }
      //password is incorrect
      else {
        res.json("mismatch");
      }
      
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
  const {email, password, username} = req.body;
  const data = {
    username: username,
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
      console.log(data);
      await collection.insertMany([data]);
    }
  } catch (error) {
      res.json("does not exist");
  }
})

//pull account information
app.get('/account/:username', async(req, res) => {
  const username = req.params.username;
  console.log(username);

  try {
    //searches the user in the database
    const user = await collection.findOne({username: username});
    if(user) {
      console.log(user);
      const userData = {
        email: user.email,
        password: user.password,
      };
      res.json(userData);
    } else {
      console.log('no user found');
      res.status(404).json("user does not exist");
    }
  } catch (error) {
    res.json("does not exist");
  }
})

let PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})