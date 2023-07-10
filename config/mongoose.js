const mongoose = require('mongoose');

const db = main().catch(err=>console.log(err))
async function main()
{
    await mongoose.connect('mongodb://127.0.0.1/contact_list')
    console.log('database connected succesfully')
}
module.exports = db;