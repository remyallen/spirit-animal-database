var express = require('express');
var router = express.Router();
var path = require('path');
var animalArray= [];

router.get('/', function(req, res) {
    res.send(animalArray);
});

router.post('/', function(req, res) {
    animalArray.push(req.body);
    console.log(animalArray);
    res.send(animalArray);
});

module.exports = router;