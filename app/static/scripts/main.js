(function() {
    var Message, url;
    Message = function(arg) {
        (this.text = arg.text), (this.message_side = arg.message_side);
        this.draw = (function(_this) {
            return function() {
                var $message;
                $message = $(
                    $('.message_template')
                        .clone()
                        .html()
                );
                $message
                    .addClass(_this.message_side)
                    .find('.text')
                    .html(_this.text);
                if (this.message_side === 'left') {
                    url = '/static/images/bot.png';
                } else {
                    url = '/static/images/user.png';
                }
                $message
                    .find('.avatar')
                    .css('background-image', 'url(' + url + ')');
                $('.messages').append($message);
                return setTimeout(function() {
                    return $message.addClass('appeared');
                }, 0);
            };
        })(this);
        return this;
    };
    $(function() {
        var getMessageText, sendMessage;
        getMessageText = function() {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function(text) {
            var $messages, message, messages_list, msg_idx;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: 'right'
            });
            message.draw();
            $.ajax({
                async: false,
                type: 'GET',
                url: '/get_botresponse',
                success: function(msg) {
                    messages_list = JSON.parse(msg);
                }
            });
            for (msg_idx in messages_list) {
                message = new Message({
                    text: messages_list[msg_idx],
                    message_side: 'left'
                });
                message.draw();
            }
            return $messages.stop().animate(
                { scrollTop: $messages.prop('scrollHeight') },
               700
            );
        };
        $('.send_message').click(function() {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function(e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        var message_greetings = new Message({
            text: 'Hi, I am simple bot. How can I help you?',
            message_side: 'left'
        });
        message_greetings.draw();
    });
}.call(this));
