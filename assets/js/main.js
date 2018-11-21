$(function(){
    setTimeout(function () {
        $('body').addClass('loaded');
    },400);
});

var socket = io();