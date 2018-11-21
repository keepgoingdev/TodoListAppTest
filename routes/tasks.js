var express = require('express');
var router = express.Router();

//Home Page
router.get('/add_task', function (req, res) {
    return res.render('add_task', {})
})
router.get('/edit_task/:id', function (req, res) {
    var id = req.params.id;
    return res.render('edit_task', {})
})
module.exports = router;