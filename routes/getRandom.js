var animalData = require('animalData');
var nameData = require('nameData');
var dataPair = {};

pairData();

function pairData(name, animal){

   var randomNameIndex = getRandom(0, name.length);
   var randomAnimalIndex = getRandom(0, animal.length);
    dataPair.name = name[randomNameIndex].name;
    dataPair.animal = animal[randomAnimalIndex].spiritAnimal;
    console.log('data pair is' + dataPair.name + dataPair.spiritAnimal);
}

function getRandom (max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var arrayIndex = (getRandomInt(0, (data.length)));
//            console.log(data[array

