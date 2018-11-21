$(document).on('click', '#btn-update', function(e){
    e.preventDefault();
    tasksTestApi.updateTaskContent($(this).attr('data-id'), $("#task-title").val(), $("#task-descripton").val()).done(function(data){
        console.log(data);
        window.location.href = "/";
    }).fail(function(err){
        console.log(err);
    }).always(function(){
        console.log(err);
    });
});