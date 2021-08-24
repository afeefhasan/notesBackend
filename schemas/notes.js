const mongoose = require('mongoose');

let NoteSchemas = mongoose.Schema({
    note_title : {
        type : String
    },
    note_description : {
        type : String
    }
    
});

module.exports = NoteSchemas = mongoose.model('notes',NoteSchemas);