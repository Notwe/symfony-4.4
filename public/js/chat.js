$(document).ready(function() {
    $.ajax({
        url: '/rest?chat',
        type: 'POST',
        data: {'get_last_user_room':''},
        success: function (data) {
            if(data == 'empty') {
                return false;
            } else {
                getChatMessage(data.join(), '');
            }
        }
    });
});

/**
 * get user rooms
 */
$(document).ready(function() {
    $.ajax({
        url: '/rest?chat',
        type: 'POST',
        data: {'room_list':''},
        success: function (data) {
            for (var i = 0; i < data.length; i++){
                $(".public_room_list").append(
                    "<div class='room_list'><a href='#" + data[i].name_room + "' onclick='return confirmRoom(&quot;" + data[i].name_room + "&quot;,&quot; " + data[i].room_id + "&quot;)';>" + data[i].name_room + "</a></div>");
            }
        }
    });
});


/**
 *  confirmRoom
 * change of rooms
 * @param name_room
 * @param room_id
 * @returns {boolean}
 */
function confirmRoom(name_room, room_id){
    if (confirm("Ты точно хочешь в чат " + name_room + "?")) {
        $('.user_send_message').val('')
        let message_id = '';
        $('#message_box > div').remove();
        $('.user_send_message').attr('id', $.trim(room_id) );
        clearTimeout(timer);
        getChatMessage($.trim(room_id), message_id)
    }
    else {
        return false;
    }
}


/**
 * get room message
 * @param room_id
 * @param message_id
 */
function getUserViewParam(){
    var returnParam = '';
    $.ajax({
        async: false,
        url: '/rest?chat',
        type: 'POST',
        dataType: "json",
        data:{view_param:''},
        success: function (data) {
            returnParam = data;
            return returnParam;
        }

    });
    return returnParam;
}

/**
 * update room message
 * time 3000
 */
let timer;
function update_message(room_id ,message_id){
    timer = setTimeout(function (){
        getChatMessage(room_id, message_id);
    }, 3000);
}
function getChatMessage(room_id, message_id){
    if(room_id){
        $.ajax({
            url: '/rest?chat',
            type: 'POST',
            data: {
                "get_message":'',
                "room_id":room_id,
                "message_id":message_id,
            },
            success: function (data) {
                if(data != 'empty'){
                    if($(".user_name").length >= 50){
                        let count = data.length * 2;
                        var removeblock = function(){
                            $(`#message_box > div:nth-child(-n + ${count})`).remove();
                        }
                    }
                    let block = getUserViewParam().join();
                    for (var i = 0; i < data.length; i++){
                        let user_block = block.replace(/data.id/g, data[i].id)
                            .replace(/data.name/g, data[i].name)
                            .replace(/data.message/g, data[i].message)
                            .replace(/data.add_time/g, data[i].add_time);
                        $(removeblock);
                        last_message_id = data[data.length -1].id;
                        $("#message_box").append(user_block);
                    }
                    $(".message_box").animate({ scrollTop: (7000) }, "fast");
                }
                update_message(room_id, last_message_id);
            }
        });
    }

}

/**
 * send user message
 */
$(function() {
    $(".button_send_message").click(
        function(){
            $.ajax ({
                url: '/rest?chat',
                type: 'POST',
                data: {
                "add_message":$('.user_send_message').val(),
                "room_id":$('.user_send_message').attr('id'),
                },
                success: function (data) {
                    if(data == 'true'){
                        $('.user_send_message').val('');
                        return true;
                    }
                    $('#error_message > li').remove();
                    if(data){
                        if(data.length > 0){
                            for (var i = 0; i < data.length; i++){
                                $("#error_message").append(
                                    "<li>"+data[i]+"</li>"
                                );

                            }
                        }
                    }
                }
            });
        }
    );
});

/**
 * for edit and delete user message
 * @param message_id
 * @param message
 * @returns {boolean}
 */
function editMessage(message_id, message) {
    let edit_message = prompt("Сообщение", message);
    if(edit_message){
        if(edit_message != null ){
            let action = function (){window.location.reload()};
            userMessageEdit(message_id, edit_message, action)
        }
    }
    if (!edit_message) {
        alert('Сообщение не может быть пустым.');
    }
}

/**
 * @return {boolean}
 */
function deleteMessage (message_id) {
    if (confirm("Вы подтверждаете удаление?")) {
        let action = function (){window.location.reload()};
        userMessageDelete(message_id, action)

    }
    else {
        return false;
    }
}


function userMessageEdit(message_id, message, action){
    if(message_id){
        $.ajax ({
            url: '/rest?chat',
            type: 'POST',
            data: {
                'edit_message': '',
                'id_message'  :message_id,
                'messages'    :message,
            },
            success: function (data) {
                if(data == 'confirm'){
                    alert('Сообщение изменено');
                    $(action);
                }
                $('#error_message > li').remove();
                if(data){
                    if(data.length > 0){
                        for (var i = 0; i < data.length; i++){
                            $("#error_message").append(
                                "<li>"+data[i]+"</li>"
                            );

                        }
                    }
                }
            }
        });
    }

}

function userMessageDelete(message_id, action){
    if(message_id){
        $.ajax ({
            url: '/rest?chat',
            type: 'POST',
            data: {
                'deleted_message': '',
                'id_message'  :message_id,
            },
            success: function (data) {
                if(data == 'confirm'){
                    alert('Сообщение удалено');
                    $(action);
                }
                $('#error_message > li').remove();
                    if(data.length > 0){
                        for (var i = 0; i < data.length; i++){
                            $("#error_message").append(
                                "<li>"+data[i]+"</li>"
                            );

                        }
                    }
            }
        });
    }

}