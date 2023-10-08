const express = require('express');
const { Users, Cart, Order } = require('./mongo');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', async(req, res) => {
  //axios passes email and password from login page
  //server.js gets the email and pass from the req.body
  const {email, password} = req.body;

  try {
    //searches the user in the database
    const check = await Users.findOne({email: email});
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
    const check = await Users.findOne({email: email});
    const checkUser = await Users.findOne({username: username});
    if(check || checkUser) {
      res.json("exists");
    }
    else {
      res.json("does not exist");
      await Users.insertMany([data]);
    }
  } catch (error) {
      res.json("does not exist");
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

//pull items from cart Users
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

let PORT = process.env.PORT || 3500; 

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})