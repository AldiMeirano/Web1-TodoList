const mongoose = require('mongoose');

const Item = mongoose.model('item', { 
    newItem : { 
        type : String,
        required: true
    }
});

const Home = mongoose.model('home', { 
    homeItem : { 
        type : String,
        required: true
    }
});

module.exports ={Item, Home};