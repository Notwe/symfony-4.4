
$(function() {
    $('form').submit(
		function(event){
            event.preventDefault();
    		$.ajax ({
    			url: $(this).attr('action'),
    			type: $(this).attr('method'),
    			data: $(this).serialize(),
    			success: function (data) {
                    if(data.status === 'success'){
                        $(function (){window.location.replace('sign-in')});
                    }
                    $('.clyde_message > a').remove();
                    $('.clyde_message > li').remove();
					if(data.status === 'error'){
							for (var i = 0; i < data.data.length; i++){
								$(".clyde_message").append(
									"<li class=clyde_message_info ><b>"+data.data[i]+"</b></li>"
								);

							}

					}
    			},
    		});
		}
	);
});
