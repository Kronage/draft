var express = require('express');
var router = express.Router();
var helper = require(global.appRoot + '/modules/helpers.js');
var Datastore = require('nedb');
var db = new Object;
db.draft = new Datastore({ filename: 'data/draft.nedb', autoload: true });
db.movie = new Datastore({ filename: 'data/movie.nedb', autoload: true });

/* GET home page. */
router.get('/', function(req, res, next) {
    var current_draft = helper.currentDraft();
    if (typeof current_draft == 'object') {
        var selection_draft = current_draft;
    }

    db['movie'].find( selection_draft ).sort({ release_date: 1 }).exec( function(err, docs) {
        if (err) { console.log("Unable to get movie documents",err); process.exit(1); };

        // get the draft details as well
        db['draft'].findOne( selection_draft ).exec(function(err, doc) {
            if (err) { console.log("Unable to get movie documents",err); process.exit(1); };
            selection_draft.draft_start = doc.draft_start;
            selection_draft.draft_end = doc.draft_end;
            selection_draft.season_start = doc.season_start;
            selection_draft.season_end = doc.season_end;

            res.render('index', { title: 'IDX Movie Draft', movies: docs, current_draft: selection_draft });
        });
    });
});

/* team addtions page */
router.get('/add_team', function(req, res, next) {
    var current_draft = helper.currentDraft();
    if (typeof current_draft == 'object') {
        var selection_draft = current_draft;
    }

    res.render('add_team', {title: 'Add a drafting team', current_draft: selection_draft});
});

module.exports = router;
