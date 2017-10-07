var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', message => {
    var formattedTime = moment(message.createdAt).format('H:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', message => {
    var formattedTime = moment(message.createdAt).format('H:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var textbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: textbox.val()
    }, function() {
        textbox.val('');
        console.log('Sent');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function() {
            locationButton.removeAttr('disabled').text('Send location');
        });
    }, function() {
        alert('Unable to get position');
        locationButton.removeAttr('disabled').text('Send location');
    });
});
