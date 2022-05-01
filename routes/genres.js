const mode = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const { ObjectId } = require('bson');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await mode.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    let genre = new mode(req.body);
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {

    const genre = await mode.findByIdAndUpdate(req.params.id, { name: req.body.name },
        { new: true })
    .then(genre => {
        if (!genre) {
            return res.status(404).send("genre was not found with the given id");
        }
        res.send(genre)
    })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send("genre was not found with the given id")
            }
        })

    return res.status(500).send("error in updating the given genre")
});

router.delete('/:id', async (req, res) => {
    const genre = await mode.findByIdAndRemove(req.params.id)
    .then(genre => {
        if (!genre) {
            return res.status(404).send("genre was not found with the given id");
        }
        res.send(genre)
    })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send("genre was not found with the given id")
            }
        })

    return res.status(500).send("error in deleting the given genre")
});
    

router.get('/:id', async (req, res) => {
    const genre = await mode.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router;