const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

module.exports = Article = mongoose.model('Article',ArticleSchema); // create the mongoose model