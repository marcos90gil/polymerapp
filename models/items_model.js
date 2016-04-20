'use strict';

let mongoose = require('../config/connectMongoose.js');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

// mongoose schema
let ItemSchema = new Schema({
	title: String,
	body: String
});

module.exports = mongoose.model('Item', ItemSchema);
