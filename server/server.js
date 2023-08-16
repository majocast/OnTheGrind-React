const express = require('express');
const { collection, cart, Order } = require('./mongo');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');

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
    const checkUser = await collection.findOne({username: username});
    if(check || checkUser) {
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

//add item to cart collection
app.post('/addcart', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const {cartValue, cartItem, user, price} = req.body;
  const data = {
    username: user,
    item: cartItem,
    price: price,
    weight: cartValue,
  }
  console.log(data);

  try {
      console.log(data);
      await cart.insertMany([data]);
      res.json('item successfully added to cart!');
  } catch (error) {
      console.log(error)
      res.json("could not complete add item");
  }
})

//pull items from cart collection
app.get('/pullcart/:username', async(req, res) => {
  const username = req.params.username;
  console.log(username);

  try {
    const items = await cart.find({username: username});
    res.json([items]);
  } catch (error) {
    console.log(error);
    res.json("items not pulled");
  }
})

//remove items from cart collection

app.delete('/removeitem/:value', async(req, res) => {
  const itemId = req.params.value;
  try {
    const deletedItem = await cart.findByIdAndDelete(itemId);
    if(!deletedItem) {
      res.json('item not found');
    } else {
      res.json('item deleted');
    }
  } catch (error) {
    res.json('error when deleting item: ' + error);
  }
})

//adding order to order collection
app.post('/submitorder/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    const removeAll = await cart.deleteMany({ 'username': username })
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
      const userToUpdate = await collection.findOne({username: userToEdit});
      const cartToUpdate = await cart.find({username: userToEdit});
      const updateExists = await collection.findOne({username: updatedData});
      if(!updateExists) {
        if(cartToUpdate) {
          await cart.updateMany (
            { username: userToEdit },
            { $set: { username: updatedData }}
          );
          console.log(`successfully updated carts with ${userToEdit} to ${updatedData}`);
        } else {
          console.log('no matching records found in cart with username: ' + userToEdit)
        }
        userToUpdate.username = updatedData;
        await userToUpdate.save();
        res.json('username updated successfully');
      } else {
        res.json('username already taken');
      }
    } else {
      res.json('username unchanged');
    }
  } catch (error) {
    console.log('error when updating order or deleting documents: ' + error);
  }
})

//currently not working because of google authorization for my email
/*
app.post('/resetEmail', async (req, res) => {
  const email = req.body.resetEmail;
  console.log(email);
  const parts = email.split('@');
  let service = '';
  if(parts.length === 2) {
    service = parts[1].toLowerCase().slice(0, -4);
  } else {
    service = null;
  }
  console.log(service);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      //fill these with my email and password generated by google security key
      user: '',
      pass: ''
    },
  });

  const mailOptions = {
    from: 'marcjgcastro@gmail.com',
    to: email,
    subject: 'Reset Your Password for On The Grind!',
    text: 'Follow the link below to reset your password!',
    html: '<p><a href="localhost:3000/resetPassword>Reset Password</a>.</p>'
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
      res.json('error sending email');
    }
    else {
      console.log('Email sent: ', info.response)
      res.json('email sent');
    }
  })
})
*/

let PORT = process.env.PORT || 3500; 

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})