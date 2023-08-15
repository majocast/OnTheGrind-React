const mongoose = require('mongoose');

//connection to mongoDB database, move to env file later
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/onthegrind', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
.then((con) => console.log(`Connected to MongoDB on HOST: ${con.connection.host}`))
.catch((err) => console.log(err));

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    required: true
  }
})

const orderSchema = new mongoose.Schema({
  cart: [{
    item: String,
    weight: String,
    price: Number
  }],
  billing: {
    name: String,
    street: String,
    city: String,
    state: String,
    country: String,
    cardNumber: String,
    nameOnCard: String,
    expiration: String,
    zipCode: String,
    cvv: String
  },
  shipping: {
    option: String,
    scheduledDate: Date
  },
  shippingInfo: {
    shipName: String,
    shipStreet: String,
    shipCity: String,
    shipState: String,
    shipCountry: String,
    shipZip: Number,
    email: String
  }
});

const collection = mongoose.model('users', newSchema);
const cart = mongoose.model('cart', cartSchema);
const Order = mongoose.model('order', orderSchema);

//code below is necessary to access the database from any file.
module.exports = { collection, cart, Order };