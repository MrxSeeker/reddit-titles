var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostTitleSchema = new Schema({
    'titleName': String,
    'postLink': String,
});

var postTitle = mongoose.model("PostTile", PostTitleSchema);
module.exports = postTitle;
