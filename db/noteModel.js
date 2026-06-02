const mongoose = require('mongoose');
const schema = mongoose.Schema;
const noteSchema = new schema({
    user_id: {type: schema.Types.ObjectId, ref: 'Users', required: true},
    title: {type: String, required: true},
    content: {type: String},
    file_name: {type: String},
    date_created: {type: Date, default: Date.now}
});

module.exports = mongoose.model.Notes || mongoose.model('notes', noteSchema);