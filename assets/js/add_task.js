$(document).on('submit', '#form', function(e){
    e.preventDefault();
    if(!$('button[type="submit"]').hasClass('disabled')) {
        $('button[type="submit"]').addClass('disabled');

        tasksTestApi.postTask($(this).serialize()).done(function (data) {
            cleanForm();
            window.location.href = "/";
        }).fail(function (err) {
            var obj = JSON.parse(err.responseText);
            if(obj.errors){
                if(obj.errors.title){
                    $('.form-group-title').addClass('has-error');
                    $('#help-task-name').html(obj.errors.title.message);
                }
                if(obj.errors.description){
                    $('.form-description').addClass('has-error');
                    $('#help-task-description').html(obj.errors.description.message);
                }
            }
        }).always(function () {
            $('button[type="submit"]').removeClass('disabled');
        });
    }
});

function cleanForm(){
    $('#form').trigger("reset");
    if(!$('.form-description').hasClass('hidden')){
        $('.toggle-description').trigger('click');
    }
}