$(function(){
    setTimeout(function () {
        $('body').addClass('loaded');
    },400);
});

var socket = io();

window.tasksTestApi = (function () {
    var tasksTestApi = {
        getTasks: function(filter){
            var deferred = new $.Deferred();
            var jqXHR = $.ajax({
                url: '/api/tasks',
                data: {filter: filter},
                method: 'get'
            }).done(function(data){
                deferred.resolve(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                deferred.reject(jqXHR);
            });
            return deferred.promise();
        },
        postTask: function(data){
            var deferred = new $.Deferred();
            var jqXHR = $.ajax({
                url: '/api/tasks',
                data: data,
                method: 'post'
            }).done(function(data){
                deferred.resolve(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                deferred.reject(jqXHR);
            });
            return deferred.promise();
        },
        deleteTask: function(id){
            var deferred = new $.Deferred();
            var jqXHR = $.ajax({
                url: '/api/tasks/'+id,
                method: 'delete'
            }).done(function(data){
                deferred.resolve(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                deferred.reject(jqXHR);
            });
            return deferred.promise();
        },
                updateTaskStatus: function(id, status){
            var deferred = new $.Deferred();
            var jqXHR = $.ajax({
                url: '/api/task_update_status/'+id,
                data: {status: status},
                method: 'post'
            }).done(function(data){
                deferred.resolve(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                deferred.reject(jqXHR);
            });
            return deferred.promise();
        },
        updateTaskContent: function(id, title, description){
            var deferred = new $.Deferred();
            var jqXHR = $.ajax({
                url: '/api/task_update_content/'+id,
                data: {title : title, description: description},
                method: 'post'
            }).done(function(data){
                deferred.resolve(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                deferred.reject(jqXHR);
            });
            return deferred.promise();
        }
    }
    return tasksTestApi;
}());