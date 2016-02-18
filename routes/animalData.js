var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = '';

if (process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'SSL';
} else {
    connectionString = 'postgres://localhost:5432/spirit_animal';
}

router.get('/', function(req, res) {
    res.send(animalArray);
});

router.post('/', function(req, res) {
    var addAnimal = {
        animal_name: req.body.spiritAnimal,
        animal_color: req.body.spiritAnimalColor
    };

    pg.connect(connectionString, function(err, client, done){
        client.query('INSERT INTO animal (animal_name, animal_color) VALUES($1, $2) RETURNING animal_id',
            [addAnimal.animal_name, addAnimal.animal_color],
                function (err, result) {
                    if (err){
                        console.log('error inserting data: ' , err );
                        res.send (false);
                    } else {
                        res.send(result);
                    }
                });
    });

});

////// Handling post request for animalID

router.post('/id', function(req, res){
    var animalid = req.body.name;
    var firstName = req.body.personfirst;
    var lastName = req.body.personlast;

    pg.connect(connectionString, function (err, client, done) {
       client.query('UPDATE people SET animal_id = animalid VALUES($1) WHERE first_name = firstName AND last_name = lastName;',
        [animalid, firstName, lastName],
        function (err, result) {
            if (err){
                console.log('error inserting data: ' , err );
                res.send (false);
            } else {
                res.send(result);
            }
        });
    });
});

module.exports = router;