const Note = require('../db/noteModel');

const getAllNotes = async function (req, res) {
    const userId = req.user_id;
    try{
        const notes = await Note.find({user_id:userId}).sort({date_created: -1});
        res.status(200).send(notes);
    }
    catch(err){
        res.status(500).send(err);
    }
}

const addNewNote = async function (req, res) {
    try{
        const userId = req.user_id;
        // TODO 6: Lấy title và content từ req.body
        const {title, content} = req.body;
        
        // Kiểm tra xem req.file có tồn tại không để tránh lỗi crash server
        const file_name = req.file ? req.file.filename : undefined;
        
        // TODO 8: Tạo const newNote = new Note({...}) bao gồm user_id, title, content và file_name
        const newNote = new Note ({
            user_id: userId,
            title,
            content,
            file_name
        })
        
        // TODO 9: Dùng await newNote.save() và gửi res.status(200).send(newNote)
        await newNote.save();
        console.log(newNote);
        res.status(200).send(newNote);
    }
    catch(err){
        res.status(500).send(err);
    }
}

const editNote = async function (req, res) {
    try{
        const { title, content } = req.body;
        const noteId = req.params.note_id;
        const file_name = req.file ? req.file.filename : undefined;

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }
        note.title = title || note.title;
        note.content = content || note.content;
        note.file_name = file_name || note.file_name;
        await note.save();
        res.status(200).json({msg: 'Note updated successfully', note});
    }
    catch(err){
        res.status(500).send(err);
    }
}

const removeNote = async function (req, res) {
    try{
        const noteId = req.params.note_id;
        await Note.findByIdAndDelete(noteId);
        res.status(200).send({msg: 'Note deleted successfully'});
    }
    catch(err){
        res.status(500).send(err);
    }
}
module.exports = {
    getAllNotes,
    addNewNote,
    editNote,
    removeNote
}