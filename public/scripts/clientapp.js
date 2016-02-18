$(document).ready(function() {
    loadNameDom();
    $('#post-name-button').on('click', clickPostNameData);
    $('#server-results').on('click', 'button', postAnimalId);
    $('#post-animal-button').on('click', sendAnimalData);

});

function sendAnimalData() {
    event.preventDefault();

    var values = {};

    $.each($('#post-animal').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-animal').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        beforeSend: function() {
            console.log('before!' + values.name);
        },
        success: function(data) {
            //refreshDom(data);
            console.log('From Server: ', data);
            console.log(data);
        }
    });


}
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

//function loadDom() {
//    $.ajax({
//        type: 'GET',
//        url: '/animal',
//        success: function(data) {
//            refreshDom(data);
//        }
//    });
//}

//function refreshDom(array){
//    $('#animal-results').empty();
//
//    for (var i = 0; i < array.length; i++){
//        $('#animal-results').append('<p> Animals from Server: ' + array[i].spiritAnimal + 'Animal Color: ' + array[i].spiritAnimalColor + '</p>');
//
//    }
//
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

function refreshNameDom(data){
    $('#server-results').empty();

    for (var i = 0; i < data.length; i++){
        $('#server-results').append('<div class="person-div"></div>');
        var $el = $('#server-results').children().last();
        $el.append('<p> Name: </p><p id="firstName">' + data[i].first_name + '</p><p id="lastName">' + data[i].last_name + '</p>');
       $el.append('<form class="person-form"><label for="animalId">' +
            'Animal ID: </label><input type="text" id="animalId" name="animalId" />' +
            '<button class="update">Update</button>');


    }

}

function postAnimalId (){
    event.preventDefault();

    var animalIdValue = {};

    animalIdValue.name = $('#animalId').val();
    animalIdValue.personfirst = $('#firstName').text();
    animalIdValue.personlast = $('#lastName').text();

    console.log(animalIdValue);

    $.ajax({
        type: 'POST',
        url: '/animal/id',
        data: animalIdValue,
        success: function(data){
            console.log('Info from the server: ' + data);
        }
    });

}