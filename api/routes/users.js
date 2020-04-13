var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// obviously - this information will come from the DB
	// using the userID
	// if userID is not specfiied, then use a default userId
	res.json({
		'name': req.body.name || "Harry Potter",
		'email': 'blahblah@blah.blah',
		'preferred_drink': 'cold brew',
		'sessions': []
	});
});

// router.post('/sessions', function(req,res,next) {

// })

// router.get('/sessions', function(req,res,next) {
// 	res.json({

// 	})
// });

module.exports = router;
