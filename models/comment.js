var mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chat')

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	name: {type:String},
	comment: {type:String},
	date: {type:Date, default:Date.now}
});

exports.Comment = mongoose.model('Comment',commentSchema);