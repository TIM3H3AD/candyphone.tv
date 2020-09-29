const mongoose = require("mongoose");
const Cube = require("./Cube");
const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
   imageUrl: { type: String, required: true },
   description: { type: String, /* required: true, unique: true */ },
   cubes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }]
});

module.exports = mongoose.model('Accessory',accessorySchema);