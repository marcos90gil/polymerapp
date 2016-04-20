'use strict';

let express = require('express');
let router = express.Router();
let User = require('../../../models/users_model.js');

// routes restful for users
router.route('/')
	
	/* GET request to all the users in db  */
	.get(function(req, res) {
		
		User.find(function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});
			
	})

	/* POST request save user  */
	.post(function(req, res) {

		let user = new User(req.body);

		user.save(function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});

	})

	/* DELETE request to reset the users */
	.delete(function(req, res) {
		
		User.remove(function(err) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data: 'DELETED' });
		});

	});

// routes restful with parameters
router.route('/:id')

	/* GET request for user by id  */
	.get(function(req, res) {
		User.findById(req.params.id, function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});

	})

	/* PUT request for editing a user by id  */
	.put(function(req, res) {
		let options = {};
		User.update({ _id: req.params.id }, { $set: req.body }, options, 
			function(err, data) {
				if (err) {
					return res.json({ result: false, error: err });
				}
				return res.json({ result: true, data });
			}
		);

	})

	/* DELETE request to remove an specific user */
	.delete(function(req, res) {
		User.remove({
			_id: req.params.id
			}, function(err) {
				if (err) {
					return res.json({ result: false, error: err });
				}
				return res.json({ result: true, data: 'DELETED' });
			}
		);

	});

module.exports = router;
