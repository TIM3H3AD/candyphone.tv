const mongoose = require("mongoose");
const Plink = require("./Plink");

const timestampSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: { type: String, /* required: true, unique: true */ },
   plinks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plink' }]
});

module.exports = mongoose.model('Timestamp',timestampSchema);