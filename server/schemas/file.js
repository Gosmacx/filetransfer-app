const mongoose = require("mongoose");

const schema = mongoose.Schema({
   name: String,
   path: String,
   extension: String,
   size: String
})

module.exports = mongoose.model("file", schema)