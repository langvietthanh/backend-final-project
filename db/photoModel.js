const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new schema({
  comment: { type: String, required: true},
  date_time: { type: Date, default: Date.now},
  user_id: { type: schema.Types.ObjectId}
}) 

const photoSchema  = new schema({
  file_name: {type: String},
  date_time: { type: Date, default: Date.now },
  user_id: { type: schema.Types.ObjectId},
  comments: [commentSchema],
})

const Photo = mongoose.model('Photos', photoSchema);
module.exports = Photo;