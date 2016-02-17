$(document).ready(function() {
    loadDom();
    $('#post-animal-button').on('click', clickPostData);
    //$('#get-animal-button').on('click', clickGetData);

});

function clickPostData() {
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
            refreshDom(data);
            console.log('From Server: ', data);
            console.log(data);
        }
    });


}

//function clickGetData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/animal',
//        success: function(data) {
//            var arrayIndex = (getRandomInt(0, (data.length)));
//            console.log(data[arrayIndex]);
//            $('#random-results').append('<p id="randomName"> Randomly Selected Name: ' + data[arrayIndex].name + '</p>');
//        }
//    });
//}

function loadDom() {
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {
            refreshDom(data);
        }
    });
}

//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min)) + min;
//}

function refreshDom(array){
    $('#animal-results').empty();

    for (var i = 0; i < array.length; i++){
        $('#animal-results').append('<p> Animals from Server: ' + array[i].spiritAnimal + '</p>');

    }

}