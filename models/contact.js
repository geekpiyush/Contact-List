const mongoose = require('mongoose')
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  phone:
  {
    type:String,
    required:true
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;