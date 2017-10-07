var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', message => {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', message => {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
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
