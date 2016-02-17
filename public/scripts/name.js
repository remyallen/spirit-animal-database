/**
 * Created by cecollins on 2/11/16.
 */



$(document).ready(function() {
    loadNameDom();
    $('#post-name-button').on('click', clickPostNameData);
    //$('#get-name-button').on('click', clickGetData);

    $('#server-results').on('click', 'button', postAnimalId);

});

function clickPostNameData() {
    event.preventDefault();

    var values = {};

    $.each($('#post-name').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-name').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/name',
        data: values,
        beforeSend: function() {
            console.log('before!' + values.name);
        },
        success: function(data) {
            refreshNameDom(data);
            console.log('From Server: ', data);
            console.log(data);
        }
    });


}

//function clickGetData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/name',
//        success: function(data) {
//            var arrayIndex = (getRandomInt(0, (data.length)));
//            console.log(data[arrayIndex]);
//            $('#random-results').append('<p id="randomName"> Randomly Selected Name: ' + data[arrayIndex].name + '</p>');
//        }
//    });
//}

function loadNameDom() {
    $.ajax({
        type: 'GET',
        url: '/name',
        success: function(data) {
            refreshNameDom(data);
        }
    });
}

//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min)) + min;
//}

function refreshNameDom(array){
    $('#server-results').empty();

    for (var i = 0; i < array.length; i++){
        $('#server-results').append('<div class="person-div"></div>');
        var $el = $('#server-results').children().last();
        $el.append('<p> Names from Server: ' + array[i].name + '</p>');
       $el.append('<form class="person-form"><label for="animalId">' +
            'Animal ID: </label><input type="text" id="animalId" name="animalId" />' +
            '<button class="update">Update</button>');


    }

}

function postAnimalId (){
    event.preventDefault();

    var animalIdValue = {};

    animalIdValue.name = $('#animalId').val();
    console.log(animalIdValue);

    //add in ajax call

}