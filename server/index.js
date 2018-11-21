/**
 * Basci Library
 */
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();

var indexRouter = require('../routes/index');
var tasksRouter = require('../routes/tasks');
/**
 * Extra Library
 */
var rn = require('random-number').generator({min:10000, max:99999, integer: true});
var moment = require('moment');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
/**
 * MongoDB Configuration
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/todolist-test');
var taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: Number,
            min: 0,
            max: 1,
            required: true
        },
        createdAt: Date,
        updatedAt: Date
    },
    {
        timestamps:
            {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt'
            }
    }
);
var Task = mongoose.model('Task', taskSchema);


app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname + '/../assets')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', path.join(__dirname + '/../views'));
http.listen(process.env.PORT || 3001, process.env.IP || "0.0.0.0", function () {
    var addr = http.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port + ' - ' +  getDate());
});

/**
 * Router
 */

app.use('/', indexRouter);
app.use('/tasks_manage', tasksRouter);

/**
 * Api
 */
router.route('/tasks')
    .get(function(req, res) {
        var filter = req.query.filter || {};
        Task.find(filter, null,{sort: {createdAt: -1}}, function(err, tasks) {
            if (err) return res.status(400).json(err);

            res.json(tasks);
        });
    })
    .post(function(req, res) {
        debugger;
        var obj = { title: req.body.title, description: req.body.description || '', status: 0 };
        var task = new Task(obj);
        task.save(function (err) {
            if (err) return res.status(400).json(err);
            emitUpdateData();
            res.json(task);
        });
    })
;
router.route('/tasks/:id')
    .get(function(req, res) {
        var id = req.params.id;
        Task.findById(id,function(err, task) {
            if (err) return res.status(400).json(err);
            res.json(task);
        });
    })
    .delete(function(req, res) {
        var id = req.params.id;
        Task.findByIdAndRemove(id, function (err, task) {
            if (err) return res.status(400).json(err);
            emitUpdateData();
            res.json(task);
        });
    })
;
router.route('/task_update_status/:id')
    .post(function(req, res) {
        var id = req.params.id;
        Task.findByIdAndUpdate(id,{status: req.body.status || 0},function(err, task) {
            if (err) return res.status(400).json(err);
            emitUpdateData();
            res.json(task);
        });
    })
;
router.route('/task_update_content/:id')
    .post(function(req, res) {
        var id = req.params.id;
        Task.findByIdAndUpdate(id,{title: req.body.title, description: req.body.description || ''},function(err, task) {
            if (err) return res.status(400).json(err);
            emitUpdateData();
            res.json(task);
        });
    })
;
app.use('/api', router);

/**
 * 404 page not found
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
/**
 * Socket IO Settings
 */
io.on('connection', function (socket) {
    console.log('a user connected - ' +  getDate());
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
/**
 * global function
 */
function emitUpdateData() {
    io.emit('onUpdateData', '');
}
function getDate() {
    return moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
}