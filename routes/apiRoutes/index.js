const router = require('express').Router();
let db = require ('../../db/db.json');
const fs = require ('fs');

router.get('/notes', (req, res) => {
    console.log(db);
   res.json(db);
});

router.post('/notes', (req,res) => {
    const id = db.length + 1;
    req.body.id = id
    db.push(req.body);
    res.json(db);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
})

router.delete('/notes/:id', (req,res) => {
    const id = req.params.id;
    // removes the req.params.id, but nothing else.
    db = db.filter(note => {
        return note.id != id
    })
    // respond to user
    res.json(db);
    // respond to file (update)
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
});

module.exports=router