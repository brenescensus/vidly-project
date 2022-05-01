const Customer = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const { ObjectId } = require('bson');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers= await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true })

      .then(customer => {
        if (!customer) {
          return res.status(404).send("customer was not found with the given id");
        }
        res.send(customer)
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send("customer was not found with the given id")
        }
      })
return res.status(500).send("error in updating the given genre")
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)
    .then(customer => {
        if (!customer) {
            return res.status(404).send("customer was not found with the given id");
        }
        res.send(customer)
    })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send("customer was not found with the given id")
            }
        })

    return res.status(500).send("error in deleting the given customer")
});
    
router.get('/:id', async (req, res) => {
  const customer= await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});


module.exports = router; 