var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', message => {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
})

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        console.log('Sent');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.gelocation) {
        return alert('Your browser does not support geolocation');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
    }, function() {
        alert('Unable to get position');
    });
});
