const Movie= require('../models/movie'); 
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { ObjectId } = require('bson');


router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.post('/', async (req, res) => {
   
  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true })
    .then(movie => {
        if (!movie) {
          return res.status(404).send("movie was not found with the given id");
        }
        res.send(movie)
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send("movie was not found with the given id")
        }
      })
      return res.status(500).send("error in updating the given movie")
});


 
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id)
  .then(movie => {
    if (!movie) {
        return res.status(404).send("movie was not found with the given id");
    }
    res.send(movie)
})
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send("movie was not found with the given id")
        }
    })

return res.status(500).send("error in deleting the given movie")
});

 


router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

module.exports = router; 