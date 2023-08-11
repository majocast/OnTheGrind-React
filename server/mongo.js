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
  }
})

const collection = mongoose.model('users', newSchema);

//code below is necessary to access the database from any file.
module.exports = collection;