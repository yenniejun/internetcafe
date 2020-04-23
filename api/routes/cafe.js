var express = require('express');
var router = express.Router();

const db = require('./queries')

router.get('/', db.getCafes)

// router.get('/', (req, res) => {
//   console.log("IN ROUTER")
//   console.log(db.getCafes);
// });

router.get('/:id', db.getCafeById)
router.post('/', db.createCafe)

// GET /api/cafe/cafeId
// router.get('/:uid', function(req, res, next) {
// 	console.log('uid', req.params.uid)

// 	// NOTE: These are dummy 

// 	if (req.params.uid == 1234) {
// 		res.json({
// 			'name': 'My Cafe',
// 			'cafeid': 1234,
// 			'location': 'Hogwarts',
// 			'capacity': 10,
// 			'creator': 'Dumbledore',
// 			'create_timestamp': '2020-04-01',
// 			'is_private': 'False'
// 		})
// 	} 
// 	if (req.params.uid == 123456) {
// 		res.json({
// 			'name': 'My Other Cafe',
// 			'cafeid': 123456,
// 			'location': 'Pigfarts',
// 			'capacity': 20,
// 			'creator': 'Rumbleroar',
// 			'create_timestamp': '2020-04-03',
// 			'is_private': 'False'
// 		})
// 	}
// 	else {
// 		console.log("Returning other?")
// 		res.status(404).send("Not found")
// 	}

// 	// res.render('cafe', {
// 	// 	'username': req.query.username, 
// 	// 	'cafeid': req.query.cafeid
// 	// })
//   // res.render('cafe');
// });

// router.post('/', function(req,res,next){

// })


module.exports = router;
