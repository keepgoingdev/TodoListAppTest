$(function(){
    setTimeout(function () {
        $('body').addClass('loaded');
    },400);
});

var socket = io();

window.tasksTestApi = (function () {
    var tasksTestApi = {
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
        }
    }
    return tasksTestApi;
}());