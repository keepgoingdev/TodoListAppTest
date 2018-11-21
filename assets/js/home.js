$(document).on('click', '#add_task_btn', function(e){
    e.preventDefault();
    window.location.href = "/add_task";
});

function cleanForm(){
    $('#form').trigger("reset");
    if(!$('.form-description').hasClass('hidden')){
        $('.toggle-description').trigger('click');
    }
}

$(function(){
    getAllTasks();
});

socket.on('onUpdateData', function (data) {
    getAllTasks();
});


function getAllTasks(){
    getTasks('#tasks-container', 0);
    getTasks('#tasks-container-done', 1);
}
function getTasks(target, status){
    tasksTestApi.getTasks({status: status}).done(function(data){
        $(target).html('');
        for (var i = 0; i < data.length; i ++){
            renderTask(data[i], target);
        }
    }).fail(function(err){
        console.log(err);
    }).always(function(){
    });
}
function renderTask(data, target){
    var $task = $('#task').clone().removeAttr('id');
    $task.attr('data-id', data._id);
    $task.attr('data-status', data.status || 0);
    $task.find('.title').html(data.title || '');
    $task.find('.description').html(data.description || '');
    $task.find('.status').html(data.status?'mark as undone': 'mark as done');
    $(target).append($task);
}

function cleanForm(){
    $('#form').trigger("reset");
    if(!$('.form-description').hasClass('hidden')){
        $('.toggle-description').trigger('click');
    }
}