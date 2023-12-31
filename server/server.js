const express = require('express');
const { Users, Cart, Order } = require('./mongo');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
require('dotenv').config();

//encryption algorithm
const algorithm = 'aes-256-cbc';

//private key
const key = `${process.env.ENCRYPTKEY}`;

const initVector = crypto.randomBytes(16);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ROUTES

//registration code
app.post('/register', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  console.log('in register');
  const {email, password, username} = req.body;
  const data = {
    username: username,
    email: email,
    password: password
  }

  try {
    //searches the user in the database
    const [check, checkUser] = await Promise.all([
      Users.findOne({email: email}),
      Users.findOne({username: username}),
    ]);

    if(check || checkUser) {
      res.status(409).json('Username Or Email is Taken');
    } else {
      const cipher = crypto.createCipheriv(algorithm, key, initVector);
      let encryptedData = cipher.update(data.password, 'utf-8', 'hex');
      encryptedData += cipher.final('hex');

      const base64data = Buffer.from(initVector, 'binary').toString('base64');

      data.password = encryptedData;
      data.initVector = base64data;
      await Users.insertMany([data]);
      res.status(200).json('success');
    }
  } catch (error) {
      console.log(error.message);
      res.status(500).json('ERROR: registration process');
  }
})

app.get('/login/:email/:password', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const {email, password} = req.params;
  console.log(email)

  try {
    //searches the user in the database
    const check = await Users.findOne({email: email});
    
    const encryptedData = Buffer.from(check.initVector, 'base64');
    const decipher = crypto.createDecipheriv(algorithm, key, encryptedData);
    let decryptedData = decipher.update(check.password, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    
    if(check) {
      //password is correct
      if(decryptedData === password) {
        res.json({status: 200, username: check.username});
      }
      //password is incorrect
      else {
        res.status(401).json('incorrect password');
      }
      
    }
    else {
      res.json("does not exist");
    }
  } catch (error) {
      res.json("ERROR: " + error);
  }
})

//pull account information
app.get('/account/:username', async(req, res) => {
  const username = req.params.username;
  try {
    //searches the user in the database
    const user = await Users.findOne({username: username});
    if(user) {
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

//add item to cart Users
app.post('/addcart', async(req, res) => {
  const {cartValue, cartItem, user, price} = req.body;
  const data = {
    username: user,
    item: cartItem,
    price: price,
    weight: cartValue,
  }
  try {
      await Cart.insertMany([data]);
      res.json('item successfully added to cart!');
  } catch (error) {
      console.log(error)
      res.json("could not complete add item");
  }
})

//get items from cart for logged in user
app.get('/pullcart/:username', async(req, res) => {
  const username = req.params.username;
  try {
    const items = await Cart.find({username: username});
    res.json([items]);
  } catch (error) {
    console.log(error);
    res.json("items not pulled");
  }
})

//remove items from cart Users

app.delete('/removeitem/:value', async(req, res) => {
  const itemId = req.params.value;
  try {
    const deletedItem = await Cart.findByIdAndDelete(itemId);
    if(!deletedItem) {
      res.json('item not found');
    } else {
      res.json('item deleted');
    }
  } catch (error) {
    res.json('error when deleting item: ' + error);
  }
})

//adding order to order Users
app.post('/submitorder/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    const removeAll = await Cart.deleteMany({ 'username': username })
    console.log(removeAll.deletedCount);
    res.json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.log('error when saving order or deleting documents: ' + error);
    res.status(500).json({ error: 'Error submitting order' });
  }
});

//updating username and cart information
app.put('/editusername/:username', async (req, res) => {
  const userToEdit = req.params.username;
  const updatedData = req.body.newUsername;
  try {
    if(updatedData !== '') {
      const [userToUpdate, cartToUpdate, updateExists] = await Promise.all([
        Users.findOne({ username: userToEdit }),
        Cart.find({ username: userToEdit }),
        Users.findOne({ username: updatedData }),
      ]);
      if(!updateExists) {
        if(cartToUpdate) {
          await Cart.updateMany (
            { username: userToEdit },
            { $set: { username: updatedData }}
          );
          console.log(`successfully updated carts with ${userToEdit} to ${updatedData}`);
        } else {
          console.log('no matching records found in cart with username: ' + userToEdit)
        }
        userToUpdate.username = updatedData;
        await userToUpdate.save();
        res.status(200);
      } else {
        res.status(500);
      }
    } else {
      res.json('username unchanged');
    }
  } catch (error) {
    console.log('error when updating order or deleting documents: ' + error);
  }
})

let PORT = process.env.PORT || 3500; 

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})