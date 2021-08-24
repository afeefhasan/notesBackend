const express = require("express");
const router = express.Router();
const { check,validationResult } = require('express-validator');
const NoteSchema = require('../schemas/notes');
const config = require('config');
router.get(
    '/',
    async (req,res) => {
    return res.status(200).json({msg : "hello"});
    });
router.post(
    '/create',
    [
        check('note_title','notetitle is required').not().isEmpty(),
        check('note_description','note_description is required').not().isEmpty(),
    ],
    async (req,res) => {
        try{
            let {note_title,note_description} = req.body;
            notes = new NoteSchema({
                note_title,
                note_description,
                });
            await notes.save();

            const payload = {
            notes : {
                id : notes.id
            }
            }
            console.log(notes);
        
            res.send('true');
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : "Server Error....."});
        }
    }
);

router.get(
    '/list',
    async (req,res) => {
        console.log("list");
        const data = await NoteSchema.find({},{password : 0});
        console.log(data);
        res.send(data);
        console.log(res.status)
    }
);
router.post(
    '/data',
    async (req,res) => {
        let {note_id} = req.body;
        var data = await NoteSchema.findById(note_id,{password : 0});
        res.send(data);
    }
);

router.post(
    '/delete',
    async (req,res) => {
        let {title} = req.body;
        var data = await NoteSchema.findOneAndDelete({title});
        res.send(data);
    }
);

router.post(
    '/edit',
    [
        check('note_title','notetitle is required').not().isEmpty(),
        check('note_description','note_description is required').not().isEmpty(),
    ],
    async (req,res) => {
        try{
            let {note_id,note_title,note_description} = req.body;
            // notes = new NoteSchema({
            //     note_id,
            //     note_title,
            //     note_description,
            // });
            var response = await NoteSchema.findById(note_id);
            if(response == null)
            {
                res.send("the note is not present");
            }
            console.log(note_title,1)
            console.log(note_description,2)
             var data = await NoteSchema.findByIdAndUpdate(note_id,{ "note_title" : note_title,"note_description" : note_description});
             console.log(data);
             var data2 = await NoteSchema.findById(note_id)
             res.send(data2);
             res.send('true');
        } catch (error){
            console.log(error.message);
            return res.status(500).json({ msg : "Server Error....."});
        }
    }
);
module.exports = router;