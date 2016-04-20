'use strict';

let express = require('express');
let router = express.Router();
let Item = require('../../../models/items_model.js');

// routes restful for items
router.route('/')
	
	/* GET request to all the items in db  */
	.get(function(req, res) {
		
		Item.find(function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});
			
	})

	/* POST request save items  */
	.post(function(req, res) {

		let item = new Item(req.body);

		item.save(function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});

	})

	/* DELETE request to reset the items */
	.delete(function(req, res) {
		
		Item.remove(function(err) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data: 'DELETED' });
		});

	});

// routes restful with parameters
router.route('/:id')

	/* GET request for items by id  */
	.get(function(req, res) {
		Item.findById(req.params.id, function(err, data) {
			if (err) {
				return res.json({ result: false, error: err });
			}
			return res.json({ result: true, data });
		});

	})

	/* PUT request for editing a item by id  */
	.put(function(req, res) {
		let options = {};
		Item.update({ _id: req.params.id }, { $set: req.body }, options, 
			function(err, data) {
				if (err) {
					return res.json({ result: false, error: err });
				}
				return res.json({ result: true, data });
			}
		);

	})

	/* DELETE request to remove an specific item */
	.delete(function(req, res) {
		Item.remove({
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
