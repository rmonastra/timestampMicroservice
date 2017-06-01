var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/:time', function(req, res) {

    function unixToNaturalTime(unix) {
        var date = new Date(unix * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var month = months[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();

        var result = month + ' ' + day + ', ' + year;
        return result;
    }

    if (!isNaN(req.params.time)) {
        var result = unixToNaturalTime(req.params.time);
        var data = { natural: req.params.time, unix: result };
        res.json(data);
    } else {
        var naturalTime = new Date(req.params.time);
        if (!isNaN(naturalTime)) {
            var unix = naturalTime / 1000;
            var data = { natural: req.params.time, unix: unix };
            res.json(data);
        } else {
            res.json({ natural: null, unix: null });
        }
    }
});

module.exports = router;