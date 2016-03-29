var express = require('express');
var router = express.Router();
db.draft = new Datastore({ filename: 'data/draft.nedb', autoload: true });
db.movie = new Datastore({ filename: 'data/movie.nedb', autoload: true });

/* GET home page. */
router.get('/', function(req, res, next) {

    db['movie'].find({ season: 'summer', year: '2016' }).sort({ release_date: 1 }).exec( function(err, docs) {
        if (err) { console.log("Unable to get movie documents",err); process.exit(1); };

        res.render('index', { title: 'IDX Movie Draft', movies: docs });
    });
});

/* team addtions page */
router.get('/add_team', function(req, res, next) {

    res.render('add_team', {title: 'Add a drafting team' });
});

module.exports = router;
