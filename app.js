var express = require( 'express' );
var bodyParser = require ( 'body-Parser' );

var app = express();

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json());

var Comments=require('./models/comment.js').Comment;

//Обработчик '/comment'
app.get('/comment',function (req, res) {
	Comments.find({}, function(err, comments){
		if(err) {
			res.send(err);
		}
		else{
			res.render('index.ejs', {comments:comments});
		}
	});
});
//обработчик получения данных
app.post('/comment',function(req,res){
	//получаем переменные с данными из формы /comment
	var name=req.body.name; 
	var comment=req.body.comment;
	//добавление комментария в БД
	var newComm = new Comments({name: name, comment:comment});
	newComm.save();
	//перейти обратно в корень сайта
	res.redirect('/comment');
});

app.listen(3000,function(){
	console.log('Work on port : 3000');
});