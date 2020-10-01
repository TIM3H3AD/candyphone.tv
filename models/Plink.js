const mongoose = require("mongoose");
const Timestamp = require("./Timestamp");
const User = require("./User");

const plinkSchema = new mongoose.Schema({
   name:{ type: String, required: true },
   description:{ type: String, required: true, maxlength: 200 },
   url:{ type: String,  required: true },
   imageUrl:{ type: String,  required: true, validate: {
    validator: function(v) {
      return /.*(jpeg|jpg|png|gif|bmp)$/.test(v);
    },
    message: props => `${props.value} is not a valid Url!`
  }, },
  timestamps:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Timestamp' }],
  createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }

});

module.exports = mongoose.model('Plink',plinkSchema);