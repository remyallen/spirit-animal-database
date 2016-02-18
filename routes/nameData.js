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
   var results = [];
    pg.connect(connectionString, function (err,client, done){
        var query = client.query ('SELECT * FROM people WHERE animal_id is Null;');

        query.on('row', function (row){
            results.push(row);
        });

        query.on ('end', function () {
           client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});

router.post('/', function(req, res) {


    var addPerson = {
        first_name: req.body.firstName,
        last_name: req.body.lastName
    };

    pg.connect(connectionString, function(err, client, done){
        client.query('INSERT INTO people (first_name, last_name) VALUES($1, $2)',
            [addPerson.first_name, addPerson.last_name],
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