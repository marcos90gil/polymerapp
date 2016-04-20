'use strict';

// models
let Item = require('../models/items_model.js');
// files library
let fs = require('fs');

// db text item init
Item.remove(function(err) {

    if (err) {
        return console.log('ERROR', err);
    }

    console.log('items db empty');
    fs.readFile('./items.json', { encoding: 'utf8' }, function(err, data) {

        if (err) {
            return console.log(err);
        }

        let pack = JSON.parse(data);

        for (let i = 0; i < pack.items.length; i++) {
            
            let item = new Item(pack.items[i]);
            
            item.save(function(err, row) {
                if (err) {
                    return console.log('ERROR', err);
                }
                return;               
            });

        }
        console.log('items db init completed');

    });

});
