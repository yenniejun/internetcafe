var express = require('express');
var router = express.Router();

// Get cafe for the given ID
router.get('/', function(req, res, next) {
	res.json({
		'name': 'My Cafe',
		'cafeid': 123456,
		'location': 'Hogwarts',
		'capacity': 10,
		'creator': 'Dumbledore',
		'create_timestamp': '2020-04-01',
		'is_private': 'False'
	});

	// res.render('cafe', {
	// 	'username': req.query.username, 
	// 	'cafeid': req.query.cafeid
	// })
  // res.render('cafe');
});

// router.post('/', function(req,res,next){

// })


module.exports = router;
