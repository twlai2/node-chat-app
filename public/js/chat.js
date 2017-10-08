var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var scrollTop = messages.prop('scrollTop');
    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (scrollTop + clientHeight + lastMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

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
    scrollToBottom();
});

socket.on('newLocationMessage', message => {
    var formattedTime = moment(message.createdAt).format('H:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
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
